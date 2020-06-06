import { Component } from '@angular/core';

import { ConfigService } from '@dagonmetric/ng-config';

import { TestOptions } from './test-options';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    loading?: boolean = true;
    strValue?: string;
    testOptions?: TestOptions;

    constructor(private readonly configService: ConfigService) {
        this.configService.valueChanges.subscribe(() => {
            this.strValue = this.configService.getValue('key1') as string;
            this.testOptions = this.configService.map(TestOptions);
        });
    }

    refresh(): void {
        this.configService.load(true).subscribe(() => {
            {
                this.loading = false;
            }
        });
    }
}
