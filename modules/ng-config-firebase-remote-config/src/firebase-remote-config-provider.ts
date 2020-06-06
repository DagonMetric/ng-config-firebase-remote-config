/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { remoteConfig } from 'firebase/app';

import { EMPTY, Observable, of } from 'rxjs';
import { filter, map, observeOn, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { ConfigProvider, ConfigSection } from '@dagonmetric/ng-config';

import {
    FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS,
    FirebaseRemoteConfigProviderOptions
} from './firebase-remote-config-provider-options';
import { firebaseAppFactory } from './firebase-app-factory';
import { ZoneScheduler } from './zone-helpers';

declare let Zone: { current: unknown };

@Injectable({
    providedIn: 'any'
})
export class FirebaseRemoteConfigProvider implements ConfigProvider {
    get name(): string {
        return 'FirebaseRemoteConfigProvider';
    }

    private readonly isBrowser: boolean;
    private readonly rc: Observable<remoteConfig.RemoteConfig>;

    constructor(
        @Inject(FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS)
        private readonly options: FirebaseRemoteConfigProviderOptions,
        // eslint-disable-next-line @typescript-eslint/ban-types
        @Inject(PLATFORM_ID) platformId: Object,
        private readonly ngZone: NgZone
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        const rc$ = of(undefined).pipe(
            observeOn(this.ngZone.runOutsideAngular(() => new ZoneScheduler(Zone.current))),
            switchMap(() => (this.isBrowser ? import('firebase/remote-config') : EMPTY)),
            map(() => firebaseAppFactory(this.options.firebaseConfig, this.ngZone, this.options.appName)),
            map((app) => app.remoteConfig()),
            tap((rc) => {
                if (this.options.remoteConfigSettings) {
                    rc.settings = this.options.remoteConfigSettings as remoteConfig.Settings;
                }
            }),
            startWith((undefined as unknown) as remoteConfig.RemoteConfig),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.rc = rc$.pipe(filter<remoteConfig.RemoteConfig>((rc) => !!rc));
    }

    load(): Observable<ConfigSection> {
        return this.rc.pipe(
            switchMap((rc) =>
                this.ngZone.runOutsideAngular(async () => {
                    if (!this.isBrowser) {
                        return {};
                    }

                    try {
                        await rc.fetch();
                    } catch (fetchError) {
                        if (this.options.throwIfLoadError) {
                            throw fetchError;
                        }
                    }

                    await rc.activate();
                    await rc.ensureInitialized();

                    return rc.getAll();
                })
            ),
            map((config) => {
                const allkeys = Object.keys(config);
                const mappedConfig: ConfigSection = {};
                for (const key of allkeys) {
                    mappedConfig[key] = config[key].asString();
                }

                return mappedConfig;
            })
        );
    }
}
