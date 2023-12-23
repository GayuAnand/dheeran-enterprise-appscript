import { Injectable } from '@angular/core';
import { NEVER, Observable, catchError, from, of } from 'rxjs';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Injectable()
export class GeoLocationService {
  constructor() {
    this.init();
  }

  async init() {
    const hasGeolocationPermission = await Geolocation.checkPermissions();
    if (!hasGeolocationPermission) {
      await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });
    }
  }

  getCurrentPosition(options: PositionOptions = { enableHighAccuracy: true }): Observable<Position> {
    return from(Geolocation.getCurrentPosition(options))
      .pipe(
        catchError((err) => {
          if (!environment.production) console.log(`Error in fetching Geolocation: ${err}...`);
          return of({
            timestamp: Date.now(),
            coords: { latitude: 0, longitude: 0, accuracy: 0, altitudeAccuracy: 0, altitude: 0, speed: 0, heading: 0 }
          });
        })
      );
  }

  getGoogleLocationUrl(latitude: string | number, longitude: string | number) {
    return `https://www.google.com/maps/place/${latitude},${longitude}`;
  }
}
