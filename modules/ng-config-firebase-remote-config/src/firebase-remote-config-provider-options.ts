/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { InjectionToken } from '@angular/core';

import { FirebaseConfig } from './firebase-config';

export interface FirebaseRemoteConfigSettings {
    /**
     * Defines the maximum age in milliseconds of an entry in the config cache before
     * it is considered stale. Defaults to 43200000 (Twelve hours).
     */
    minimumFetchIntervalMillis: number;

    /**
     * Defines the maximum amount of milliseconds to wait for a response when fetching
     * configuration from the Remote Config server. Defaults to 60000 (One minute).
     */
    fetchTimeoutMillis: number;
}

export interface FirebaseRemoteConfigProviderOptions {
    firebaseConfig: FirebaseConfig;
    appName?: string;
    remoteConfigSettings?: FirebaseRemoteConfigSettings;
    throwFetchError?: boolean;
}

export const FIREBASE_REMOTE_CONFIG_PROVIDER_OPTIONS = new InjectionToken<FirebaseRemoteConfigProviderOptions>(
    'FirebaseRemoteConfigProviderOptions'
);
