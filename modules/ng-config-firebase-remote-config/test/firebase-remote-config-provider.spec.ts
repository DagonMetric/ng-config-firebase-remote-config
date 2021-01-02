import { InjectionToken, NgZone, Optional } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import firebase from 'firebase/app';

import { CONFIG_PROVIDER } from '@dagonmetric/ng-config';

import {
    FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS,
    FirebaseRemoteConfigProvider,
    FirebaseRemoteConfigProviderModule
} from '../src';
import { firebaseAppFactory } from '../src/firebase-app-factory';

export const firebaseTestConfig = {
    apiKey: 'AIzaSyColGiQV8I-MXgueajWPmaohUG-MGUxCt4',
    projectId: 'ng-config-dev',
    appId: '1:610492922716:web:e2c04dbbb1795258b21f99'
};

export class FirebaseApp implements Partial<firebase.app.App> {
    name?: string;
    options?: { [key: string]: unknown };
    delete?: () => Promise<void>;
    remoteConfig?: () => firebase.remoteConfig.RemoteConfig;
}

export const FIREBASE_APP_NAME = new InjectionToken<string | undefined>('FirebaseAppName');
// eslint-disable-next-line @typescript-eslint/ban-types
export const FIREBASE_CONFIG = new InjectionToken<Object>('FirebaseConfig');

describe('FirebaseRemoteConfigProvider', () => {
    describe('name', () => {
        it(`should return 'FirebaseRemoteConfigProvider'`, () => {
            TestBed.configureTestingModule({
                imports: [
                    FirebaseRemoteConfigProviderModule.configure({
                        firebaseConfig: firebaseTestConfig,
                        prefix: 'myAppPrefix_'
                    })
                ]
            });

            const provider = TestBed.inject<FirebaseRemoteConfigProvider>(FirebaseRemoteConfigProvider);
            void expect(provider.name).toBe(FirebaseRemoteConfigProvider.name);
        });
    });

    describe('load', () => {
        let firebaseApp: FirebaseApp;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: FirebaseApp,
                        useFactory: firebaseAppFactory,
                        deps: [FIREBASE_CONFIG, NgZone, [new Optional(), FIREBASE_APP_NAME]]
                    },
                    {
                        provide: CONFIG_PROVIDER,
                        useClass: FirebaseRemoteConfigProvider,
                        multi: true
                    },
                    {
                        provide: FIREBASE_CONFIG,
                        useValue: firebaseTestConfig
                    },
                    {
                        provide: FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS,
                        useValue: {
                            remoteConfigSettings: {
                                minimumFetchIntervalMillis: 10000,
                                fetchTimeoutMillis: 60000
                            },
                            firebaseConfig: firebaseTestConfig
                        }
                    }
                ]
            });

            firebaseApp = TestBed.inject<FirebaseApp>(FirebaseApp);
        });

        afterEach(() => {
            if (typeof firebaseApp.delete === 'function') {
                void firebaseApp.delete();
            }
        });

        it('should load data from remote config', (done: DoneFn) => {
            const provider = TestBed.inject<FirebaseRemoteConfigProvider>(FirebaseRemoteConfigProvider);
            provider.load().subscribe((data) => {
                void expect(data).toBeDefined();
                done();
            });
        });
    });
});

describe('FirebaseRemoteConfigProviderModule', () => {
    it(`should provide 'FirebaseRemoteConfigProvider'`, () => {
        TestBed.configureTestingModule({
            imports: [
                FirebaseRemoteConfigProviderModule.configure({
                    firebaseConfig: firebaseTestConfig,
                    prefix: 'myAppPrefix_'
                })
            ]
        });

        const provider = TestBed.inject<FirebaseRemoteConfigProvider>(FirebaseRemoteConfigProvider);
        void expect(provider).toBeDefined();
    });
});
