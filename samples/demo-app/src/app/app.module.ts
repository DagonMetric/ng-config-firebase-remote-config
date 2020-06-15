import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ng-config
import { ConfigModule } from '@dagonmetric/ng-config';
import { FirebaseRemoteConfigProviderModule } from '@dagonmetric/ng-config-firebase-remote-config';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,

        // ng-config modules
        //
        ConfigModule.configure(true, {
            debug: true
        }),
        FirebaseRemoteConfigProviderModule.configure({
            firebaseConfig: environment.firebaseConfig,
            remoteConfigSettings: {
                minimumFetchIntervalMillis: environment.production ? 43200000 : 30000,
                fetchTimeoutMillis: environment.production ? 30000 : 60000
            },
            prefix: 'myAppPrefix_',
            throwIfLoadError: environment.production ? false : true
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
