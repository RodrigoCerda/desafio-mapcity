import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  geocoder = null;
  public map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/light-v10`;
  lat = -33.4569397;
  lng = -70.6482697;
  zoom = 15;
  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.geocoder = new MapboxGeocoder({ accessToken: this.mapbox.accessToken, mapboxgl: this.mapbox });
    this.map.addControl(this.geocoder);
    this.map.addControl(new mapboxgl.NavigationControl())
  }
}
