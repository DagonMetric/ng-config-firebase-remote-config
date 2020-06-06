import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ConfigModule } from '@dagonmetric/ng-config';
import { FirebaseRemoteConfigProviderModule } from '@dagonmetric/ng-config-firebase-remote-config';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,

        ConfigModule.init({
            debug: true
        }),
        FirebaseRemoteConfigProviderModule.init({
            remoteConfigSettings: {
                minimumFetchIntervalMillis: 10000
            },
            firebaseConfig: {
                apiKey: 'AIzaSyA_6iPXq6Hnsz1B0OpCRr-RE_zXnsUXsP0',
                authDomain: 'remoteconfigprovidertest.firebaseapp.com',
                databaseURL: 'https://remoteconfigprovidertest.firebaseio.com',
                projectId: 'remoteconfigprovidertest',
                storageBucket: 'remoteconfigprovidertest.appspot.com',
                messagingSenderId: '1024026888349',
                appId: '1:1024026888349:web:90987460b5c0ab636b6c74'
            }
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
