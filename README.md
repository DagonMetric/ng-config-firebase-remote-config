# Angular Firebase Remote Config Provider for NG-CONFIG

Firebase Remote Config integration for [DagonMetric/ng-config](https://github.com/DagonMetric/ng-config).

## Get Started

### Installation

npm

```bash
npm install @dagonmetric/ng-config-firebase-remote-config
```

or yarn

```bash
yarn add @dagonmetric/ng-config-firebase-remote-config
```

Latest npm package is [![npm version](https://img.shields.io/npm/v/@dagonmetric/ng-config-firebase-remote-config.svg)](https://www.npmjs.com/package/@dagonmetric/ng-config-firebase-remote-config)

### Module Setup (app.module.ts)

```typescript
import { ConfigModule } from '@dagonmetric/ng-config';
import { FirebaseRemoteConfigProviderModule } from '@dagonmetric/ng-config-firebase-remote-config';

@NgModule({
  imports: [
    // Other module imports

    // ng-config modules
    ConfigModule.configure(true, {
      debug: true,
      optionsSuffix: 'Options'
    }),
    FirebaseRemoteConfigProviderModule.configure({
        firebaseConfig: {
            apiKey: '<your_firebase_api_key>',
            projectId: 'your_firebase_project_id',
            appId: 'your_firebase_app_id'
        },
        remoteConfigSettings: {
            minimumFetchIntervalMillis: 43200000
        },
        prefix: 'myAppPrefix_'
    })
    // And additional config provider imports...
  ]
})
export class AppModule { }
```

Edit [app.module.ts in stackblitz](https://stackblitz.com/github/dagonmetric/ng-config-firebase-remote-config/tree/master/samples/demo-app?file=src%2Fapp%2Fapp.module.ts)

### Usage

```typescript
import { Component } from '@angular/core';

import { ConfigService } from '@dagonmetric/ng-config';

export class AppOptions {
  name = '';
  lang = '';
  logEnabled = false;
  logLevel = 0;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private readonly configService: ConfigService) {
    // Get with key
    const configValue = this.configService.getValue('key1'));
    console.log('value: ', configValue);

    // Get with options class
    const appOptions = this.configService.mapType(AppOptions));
    console.log('appOptions: ', JSON.stringify(appOptions));

    // Configuration value change detection
    this.configService.valueChanges.subscribe(() => {
      const latestValue = this.configService.getValue('key1'));
      console.log('latest value: ', latestValue);

      const lastestOptions = this.configService.mapType(AppOptions));
      console.log('lastest appOptions: ', lastestOptions);
    });
  }
}
```

Edit [app.component.ts in stackblitz](https://stackblitz.com/github/dagonmetric/ng-config-firebase-remote-config/tree/master/samples/demo-app?file=src%2Fapp%2Fapp.component.ts)

## Feedback and Contributing

Check out the [Contributing](https://github.com/DagonMetric/ng-config-firebase-remote-config/blob/master/CONTRIBUTING.md) page.

## License

This repository is licensed with the [MIT](https://github.com/DagonMetric/ng-config-firebase-remote-config/blob/master/LICENSE) license.
