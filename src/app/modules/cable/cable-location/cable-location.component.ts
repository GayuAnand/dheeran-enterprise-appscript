import { circle, latLng, marker } from 'leaflet';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CustomerModel } from 'src/app/models';
import { BaseComponent, BaseMapLayers, MapLayers } from 'src/app/common';

@Component({
  selector: 'de-cable-location',
  templateUrl: './cable-location.component.html',
  styleUrls: ['./cable-location.component.scss']
})
export class CableLocationComponent extends BaseComponent implements OnChanges {
  @Input() customer!: CustomerModel;

  mapOptions = {};

  overlays: Record<string, any> = {};

  ngOnChanges(): void {
    if (this.customer?.hasLocationInfo()) {
      this.mapOptions = {
        layers: [BaseMapLayers[MapLayers.SATELLITE]],
        center: latLng(this.customer.getLatitudeAsNum(), this.customer.getLongitudeAsNum()),
        zoomControl: false,
        zoom: 17,
      };
    } else {
      this.mapOptions = {};
    }

    this.overlays = {
      'Customer': marker([this.customer.getLatitudeAsNum(), this.customer.getLongitudeAsNum()]),
    };
  }
}
