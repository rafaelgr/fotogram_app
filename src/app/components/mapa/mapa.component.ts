import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFmYS1hcmlhZG5hIiwiYSI6ImNrNGpwbTg1MjFpZWoza3F3OGYwYnNodzgifQ.JxKVxypzfEMisNLiQrh6WA';

    const  map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  }

}
