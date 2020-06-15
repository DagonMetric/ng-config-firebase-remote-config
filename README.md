# Angular Firebase Remote Config Provider for NG-CONFIG

[![GitHub Actions Status](https://github.com/DagonMetric/ng-config-firebase-remote-config/workflows/Main%20Workflow/badge.svg)](https://github.com/DagonMetric/ng-config-firebase-remote-config/actions)
[![Azure Pipelines Status](https://dev.azure.com/DagonMetric/ng-config/_apis/build/status/DagonMetric.ng-config-firebase-remote-config?branchName=master)](https://dev.azure.com/DagonMetric/ng-config/_build?definitionId=18)
[![Gitter](https://badges.gitter.im/DagonMetric/general.svg)](https://gitter.im/DagonMetric/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Angular Firebase Remote Config integration for [DagonMetric/ng-config](https://github.com/DagonMetric/ng-config).

## Get Started

### Installation

npm

```bash
npm install @dagonmetric/ng-config @dagonmetric/ng-config-firebase-remote-config
```

or yarn

```bash
yarn add @dagonmetric/ng-config @dagonmetric/ng-config-firebase-remote-config
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
      debug: true
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
    const appOptions = this.configService.mapType('app', AppOptions));
    console.log('appOptions: ', JSON.stringify(appOptions));

    // Call reload to get the fresh config values from providers
    // this.configService.reload().subscribe(() => {
    //   console.log('Reloaded');
    // });

    // Configuration value change detection
    // This will only trigger when reload() is called and
    // any value changes
    this.configService.valueChanges.subscribe(() => {
      const latestValue = this.configService.getValue('key1'));
      console.log('latest value: ', latestValue);

      const lastestOptions = this.configService.mapType('app', AppOptions));
      console.log('lastest appOptions: ', lastestOptions);
    });
  }
}
```

Edit [app.component.ts in stackblitz](https://stackblitz.com/github/dagonmetric/ng-config-firebase-remote-config/tree/master/samples/demo-app?file=src%2Fapp%2Fapp.component.ts)

## Samples

* Demo app [view source](https://github.com/DagonMetric/ng-config-firebase-remote-config/tree/master/samples/demo-app) / [live edit in stackblitz](https://stackblitz.com/github/dagonmetric/ng-config-firebase-remote-config/tree/master/samples/demo-app)

## Related Projects

* [ng-config](https://github.com/DagonMetric/ng-config) - The core configuration & options service for Angular applications
* [ng-log](https://github.com/DagonMetric/ng-log) - Vendor-agnostic logging, analytics and telemetry service abstractions and some implementations for Angular applications
* [ng-cache](https://github.com/DagonMetric/ng-cache) - Caching service for Angular applications

## Feedback and Contributing

Check out the [Contributing](https://github.com/DagonMetric/ng-config-firebase-remote-config/blob/master/CONTRIBUTING.md) page.

## License

This repository is licensed with the [MIT](https://github.com/DagonMetric/ng-config-firebase-remote-config/blob/master/LICENSE) license.
