import { Component } from '@angular/core';
import { Plymouth_Districts } from '../Plymouth-Districts';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})

export class MapComponent {

  districts = Plymouth_Districts;

  constructor(private chartService: ChartService){};

  onSelect(coords: any, name:string) {
    this.chartService.setSearchData(coords);
    this.chartService.setChartTitle(name);  
    this.chartService.updateCharts();
  }

  
}