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

  markerClusterData: L.Marker[] = [];

  ngOnChanges(): void {
    if (this.customer?.hasLocationInfo()) {
      this.mapOptions = {
        layers: [BaseMapLayers[MapLayers.SATELLITE]],
        center: latLng(this.customer.getLatitudeAsNum(), this.customer.getLongitudeAsNum()),
        zoomControl: true,
        zoom: 17,
        maxZoom: 19
      };
    } else {
      this.mapOptions = {};
    }

    this.markerClusterData = [marker([this.customer.getLatitudeAsNum(), this.customer.getLongitudeAsNum()])];
  }
}
