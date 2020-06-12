import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ng-config
import { ConfigModule } from '@dagonmetric/ng-config';
import { FirebaseRemoteConfigProviderModule } from '@dagonmetric/ng-config-firebase-remote-config';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,

        // ng-config modules
        //
        ConfigModule.configure(true, {
            debug: true,
            optionsSuffix: 'Options'
        }),
        FirebaseRemoteConfigProviderModule.configure({
            firebaseConfig: {
                apiKey: 'AIzaSyB69eGT5C4WTm-ugdTb2wA4dW_KCcR7sR4',
                projectId: 'ng-config-demo',
                appId: '1:1052789543009:web:af8c119286532364a4da20',
                measurementId: 'G-EKQC89VKHX'
            },
            remoteConfigSettings: {
                minimumFetchIntervalMillis: 30000,
                fetchTimeoutMillis: 12000
            },
            prefix: 'myAppPrefix_',
            throwIfLoadError: false
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
