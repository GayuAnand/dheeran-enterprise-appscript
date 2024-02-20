import { Observable, Subject, map } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';

import { environment } from './../../environments/environment';
import { ApiStorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiAppScriptService {
  useProd = environment.production;

  devDeployId = 'AKfycbwXGymXyx7sQjCVwqZVvkP6nMiRfAA_cVZ_YCiuiJs';

  prodDeployId = 'AKfycbxWZJNA0ToPZBIx7Qofz8s7nr_mng_hxkPF64pDimZNVfkpl7p1eBhpBBQqY0BExiXI';

  franchiseSciptId = '';

  functionsToUseProdDeployId: Record<string, boolean> = {
    discoveryInfo: true,
    login: true,
  };

  execPromises: Record<string, { subject: Subject<any>, observable?: Observable<any> }> = {};

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private storageService: ApiStorageService,
  ) {
    this.callback = this.callback.bind(this);
    (window as any).ApiAppScriptService = this;
    (window as any).callback = this.callback;
  }

  callback(args: any) {
    if (!this.useProd) console.log('Callback: ', args);
    if (this.execPromises[args?.callbackId]) {
      this.ngZone.run(() => {
        const sub = this.execPromises[args.callbackId];
        delete this.execPromises[args.callbackId];
        document.getElementById(args.callbackId)?.remove();
        sub.subject.next(args);
        sub.subject.complete();
      });
    }
  }

  getScriptIdForFunction(functionName: string) {
    if (this.functionsToUseProdDeployId[functionName]) {
      return this.useProd ? this.prodDeployId : this.devDeployId;
    }
    return this.franchiseSciptId;
  }

  exec<T>(functionName: string, parameters: any[] = [], callbackId = Date.now().toString()): Observable<T> {
    this.execPromises[callbackId] = { subject: new Subject() };
    this.execPromises[callbackId].observable = this.execPromises[callbackId].subject.pipe(
      map((res) => {
        if (!res.auth) {
          this.storageService.clearData(); // If auth failure, clear all data except 'prodDeployId'
          setTimeout(() => this.router.navigate(['/auth']), 1000);
        }

        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.error);
        }
      })
    );

    if (functionName) {
      this.storageService.getData('x-auth-token')
        .subscribe(token => {
          let s = document.createElement('script');
          s.setAttribute('src', `https://script.google.com/macros/s/${this.getScriptIdForFunction(functionName)}/${this.useProd ? 'exec' : 'dev'}?api=1&functionName=${functionName}&functionParameters=${encodeURIComponent(JSON.stringify(parameters))}&callbackId=${callbackId}`);
          s.setAttribute('id', callbackId);
          document.head.appendChild(s);
        });
    } else {
      this.execPromises[callbackId].subject.next({ success: false, error: 'Invalid AppScript function name.' });
      setTimeout(() => this.execPromises[callbackId].subject.complete());
    }

    return this.execPromises[callbackId].observable as Observable<any>;
  }
}
