import * as L from 'leaflet';
export * as AwesomeMarkers from 'leaflet.awesome-markers';
import { icon, Marker, LatLng, Layer, TileLayer, tileLayer } from 'leaflet';
import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { LeafletControlLayersConfig, LeafletDirective } from '@asymmetrik/ngx-leaflet';

import { BaseComponent } from '../base.component';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

export function AwesomeIcon(options: L.AwesomeMarkers.AwesomeMarkersIconOptions) {
  return L.AwesomeMarkers.icon(Object.assign({ prefix: 'fa' }, options));
}

export const MapLayers = {
  DEFAULT: 'DEFAULT',
  STREET: 'STREET',
  HYBRID: 'HYBRID',
  SATELLITE: 'SATELLITE',
  TERRAIN: 'TERRAIN',
  OPENSTREET: 'OPENSTREET',
};

export const BaseMapLayers = {
  [MapLayers.DEFAULT]: tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains:['mt0','mt1','mt2','mt3'] }),
  [MapLayers.STREET]: tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains:['mt0','mt1','mt2','mt3'] }),
  [MapLayers.HYBRID]: tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains:['mt0','mt1','mt2','mt3'] }),
  [MapLayers.SATELLITE]: tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains:['mt0','mt1','mt2','mt3'] }),
  [MapLayers.TERRAIN]: tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', { maxZoom: 50, subdomains:['mt0','mt1','mt2','mt3'] }),
  [MapLayers.OPENSTREET]: tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 50 }),
};

// DOC: https://github.com/bluehalo/ngx-leaflet?tab=readme-ov-file
// DOC: https://leafletjs.com/reference.html#zoom/pan-options
@Component({
  selector: 'de-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends BaseComponent implements OnChanges, AfterViewInit {
  @Input() options!: {
    center?: LatLng,
    layers?: TileLayer[],
    zoomControl?: boolean,
    maxZoom?: number,
  };

  /**
   * Overlay can contain markers.
   * 
   * Example: overlays = { 'Customer': marker([lat, lng]) }
   */
  @Input() overlays: Record<string, Layer> = {};

  @Input() markerClusterData!: Layer[];

  @Input() markerClusterOptions: L.MarkerClusterGroupOptions = {
    spiderfyDistanceMultiplier: 2,
    zoomToBoundsOnClick: true
  };

  @Input() styles: Record<string, any> = {};

  @ViewChild(LeafletDirective) leaflet!: LeafletDirective;

  markerClusterGroup = new L.MarkerClusterGroup();

  defaultOptions = {
    layers: [],
    zoom: 16,
    maxZoom: 22
  };

  processedOptions!: any;

  layersControl: LeafletControlLayersConfig = {
    baseLayers: BaseMapLayers,
    overlays: {}
  };

  ngOnChanges() {
    this.refreshMap();
  }

  ngAfterViewInit(): void {
    this.refreshMap();
  }

  fitBounds() {
    if (this.leaflet?.map && this.markerClusterData) {
      this.leaflet.map.fitBounds(this.markerClusterGroup.getBounds());
    }
  }

  refreshMap() {
    if (this.options) {
      this.processedOptions = Object.assign(this.defaultOptions, { layers: [BaseMapLayers[MapLayers.DEFAULT]] }, this.options);
    } else {
      this.processedOptions = null;
    }

    this.layersControl.overlays = this.overlays;
    if (this.overlays) {
      Object.values(this.overlays).forEach(o => this.processedOptions.layers.push(o));
    }

    if (this.leaflet?.map && this.markerClusterData) {
      this.leaflet.map.removeLayer(this.markerClusterGroup);
      this.markerClusterGroup.removeLayers(this.markerClusterGroup.getLayers());
      this.markerClusterData.forEach(d => this.markerClusterGroup.addLayer(d));
      this.leaflet.map.addLayer(this.markerClusterGroup);
      this.fitBounds();
    }
  }
}
