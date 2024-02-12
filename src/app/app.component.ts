import { Component, NgZone } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { CallDetector } from 'capacitor-plugin-incoming-call';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BaseModel } from './models';
import { ApiFileSystemService } from './api';
import { environment } from 'src/environments/environment';
import { BaseComponent, UiBundleUpdaterService } from './common';

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  constructor(
    private zone: NgZone,
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry,
    private fileSystemService: ApiFileSystemService,
    private uiBundleUpdaterService: UiBundleUpdaterService,
  ) {
    super();
    BaseModel.AuthService = this.authService;
    this.uiBundleUpdaterService.initialize();
    this.fileSystemService.cleanupUnknownFiles();

    App.addListener('backButton', (event) => {
      if (!environment.production) console.log('BACK BUTTON EVENT: ', event);
      if (event.canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
          // Example url: https://beerswift.app/tabs/tab2
          // slug = /tabs/tab2
          const slug = event.url.split("https://portal.dheeranenterprise.in").pop();
          if (slug) {
              this.router.navigateByUrl(slug);
          }
          // If no match, do nothing - let regular routing
          // logic take over
      });
    });

    this.matIconRegistry.addSvgIcon('whatsapp', this.setPath(`assets/images/whatsapp.svg`));
    this.matIconRegistry.addSvgIcon('whatsappwhite', this.setPath(`assets/images/whatsapp-white.svg`));
    this.matIconRegistry.addSvgIcon('whatsappreminder', this.setPath(`assets/images/whatsappreminder.svg`));
    this.matIconRegistry.addSvgIcon('bsnl', this.setPath(`assets/images/bsnl.svg`));

    // console.log('### Test CallDetector plugin ###');
    // CallDetector.detectCallState({ action: 'ACTIVATE' })
    //   .then(x => {
    //     console.log(x);
    //     this.utilService.openSnackBar(`Call state change detected: '${x}'`);
    //     CallDetector.addListener('callStateChange', res => {
    //       console.log('### Listening to callStateChange ###');
    //       console.log(res);
    //       this.utilService.openSnackBar(`Call state change: '${res}'`);
    //     });
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     this.utilService.openErrorSnackBar(`Call state change detection error: '${e}'`);
    //   });
    // CallDetector.addListener('callStateChange', res => {
    //   console.log('### Listening to callStateChange ###');
    //   console.log(res);
    //   this.utilService.openSnackBar(`Call state change: '${res}'`);
    // });
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
