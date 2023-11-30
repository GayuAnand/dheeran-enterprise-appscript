import { Observable, Subject, map } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable()
export class ApiAppScriptService {
  useProd = environment.production;

  devDeployId = 'AKfycbwXGymXyx7sQjCVwqZVvkP6nMiRfAA_cVZ_YCiuiJs';

  prodDeployId = 'AKfycbyiCXSgdMRM_X6pscDtIbHvWR2PaBT5q8Cf2x2HFSc17lRczg9HvF2-PmOwpFqZ3SQG';

  execPromises: Record<string, { subject: Subject<any>, observable?: Observable<any> }> = {};

  constructor(private ngZone: NgZone) {
    this.callback = this.callback.bind(this);
    (window as any).ApiAppScriptService = this;
    (window as any).callback = this.callback;
  }

  callback(args: any) {
    console.log('Callback: ', args);
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

  exec<T>(functionName: string, parameters: any[] = [], callbackId = Date.now().toString()): Observable<T> {
    this.execPromises[callbackId] = { subject: new Subject() };
    this.execPromises[callbackId].observable = this.execPromises[callbackId].subject.pipe(
      map((res) => {
        if (res.success) {
          return res.data;
        } else {
          throw new Error(res.error);
        }
      })
    );

    if (functionName) {
      let s = document.createElement('script');
      s.setAttribute('src', `https://script.google.com/macros/s/${this.useProd ? this.prodDeployId : this.devDeployId}/${this.useProd ? 'exec' : 'dev'}?api=1&functionName=${functionName}&functionParameters=${encodeURIComponent(JSON.stringify(parameters))}&callbackId=${callbackId}&token=${localStorage.getItem('x-auth-token') || ''}`);
      s.setAttribute('id', callbackId);
      document.head.appendChild(s);
    } else {
      this.execPromises[callbackId].subject.next({ success: false, error: 'Invalid AppScript function name.' });
      setTimeout(() => this.execPromises[callbackId].subject.complete());
    }

    return this.execPromises[callbackId].observable as Observable<any>;
  }
}
