/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { CONFIG_PROVIDER } from '@dagonmetric/ng-config';

import { FirebaseRemoteConfigProvider } from './firebase-remote-config-provider';
import {
    FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS,
    FirebaseRemoteConfigProviderOptions
} from './firebase-remote-config-provider-options';

/**
 * The `NGMODULE` for providing `FirebaseRemoteConfigProvider`.
 */
@NgModule({
    providers: [
        {
            provide: CONFIG_PROVIDER,
            useClass: FirebaseRemoteConfigProvider,
            multi: true
        }
    ]
})
export class FirebaseRemoteConfigProviderModule {
    /**
     * Call this method to configure options for `FirebaseRemoteConfigProvider`.
     * @param options An option object for `FirebaseRemoteConfigProvider`.
     */
    static configure(
        options: FirebaseRemoteConfigProviderOptions
    ): ModuleWithProviders<FirebaseRemoteConfigProviderModule> {
        return {
            ngModule: FirebaseRemoteConfigProviderModule,
            providers: [
                {
                    provide: FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS,
                    useValue: options
                }
            ]
        };
    }
}
