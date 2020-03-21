import { Component, OnInit } from '@angular/core';
import { MapService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	currentUser: User;

	constructor(private map: MapService,
		private authenticationService: AuthenticationService) {
		this.authenticationService.currentUser.subscribe(x => {
			this.currentUser = x;
		})
	}

	ngOnInit() {
		this.map.buildMap();
		if (this.currentUser) {
			this.map.map.on('load', () => {
				const features = this.currentUser.points;
				this.map.map.addSource('points', {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': features
					}
				});
				this.map.map.addLayer({
					'id': 'points',
					'type': 'symbol',
					'source': 'points',
					'layout': {
						'icon-image': ['concat', ['get', 'icon'], '-15'],
						'text-field': ['get', 'title'],
						'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
						'text-offset': [0, 0.6],
						'text-anchor': 'top'
					}
				});
			})
		}
	}
}
