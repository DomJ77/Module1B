import { Component, computed, OnInit, signal} from '@angular/core'
import { ChartService } from '../chart.service';
import { from } from 'rxjs';
import { GetAPIService } from '../getAPI.service';


@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})

export class DataTableComponent implements OnInit {
  isFetching =signal(false);

  constructor(private chartService:ChartService, private getAPI: GetAPIService) {};

  public chart1: any;
  public chart2: any;
  chartTitleName =this.chartService.chartTitle();

  public APIData:any;

  async loadAll(){
  this.isFetching.set(true);
  const APIDataset = await this.getAPI.getAPIData();
  this.APIData = from(APIDataset).subscribe(
    (results:any) => {this.APIData=results; 
      this.chartService.setInitialData(this.APIData);
      this.chartService.updateCharts();
      this.isFetching =signal(false);
      

  });
  this.isFetching.set(false);
  }
  
  ngOnInit(): void {

  
    this.loadAll();
    
    this.chartService.createChart1([],this.chartService.years,'bar');
    this.chartService.createChart2([],this.chartService.crimeCategory,'bar');
    

    
    
  }
}
