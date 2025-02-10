import { Injectable, signal } from "@angular/core";
import * as turf from "@turf/turf";
import { Chart } from 'chart.js/auto';
import { APIData } from './APIData';

@Injectable({providedIn: 'root'})
export class ChartService  {

  private selectedSearchBoundary=signal<any>([["50.3955491","-4.2093521"],["50.3802262","-4.1894394"],["50.3648984","-4.192186"],["50.3633654","-4.1726166"],["50.3388298","-4.157167"],["50.3414592","-4.0143448"],["50.4032087","-4.0054184"],["50.4012392","-4.0696197"],["50.4347093","-4.0788894"],["50.4480471","-4.1056686"],["50.4320851","-4.1928726"],["50.3955491","-4.2093521"]]);
    //initial data for whole of Plymoouth  
  public chartTitle =signal<string>("Plymouth");

    APIDataset = signal<[]>([]);
    chartData:APIData[] = [];
    

  setInitialData(data:any){
    this.APIDataset.set(data);
  }    

  setSearchData(update:[]){
      this.selectedSearchBoundary.set(update);
  }

  setChartTitle(name:string){
    this.chartTitle.set(name);
}
    //change search area on set

  async updateCharts(){
    var searchWithin = turf.polygon([(this.selectedSearchBoundary())]); 
    var pointsArray = await this.toCoords(this.APIDataset(),searchWithin);
    this.chartData = await this.filterData(this.APIDataset(),pointsArray);
    this.chart1.data.datasets[0].data=[this.getCount("anti-social-behaviour"),this.getCount("bicycle-theft"),this.getCount("burglary"),this.getCount("criminal-damage-arson"),this.getCount("other-theft"),this.getCount("drugs"),this.getCount("possession-of-weapons"),this.getCount("public-order"),this.getCount("robbery"),this.getCount("shoplifting"),this.getCount("theft-from-the-person"),this.getCount("vehicle-crime"),this.getCount("violent-crime"),this.getCount("other-crime")];
    this.chart1.update();
    this.chart2.data.datasets[0].data=[this.getCount2('2023-01'),this.getCount2('2023-02'),this.getCount2('2023-03'),this.getCount2('2023-04'),this.getCount2('2023-05'),this.getCount2('2023-06'),this.getCount2('2023-07'),this.getCount2('2023-08'),this.getCount2('2023-09'),this.getCount2('2023-10'),this.getCount2('2023-11'),this.getCount2('2023-12')];
    this.chart2.update();
  }

  years = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  crimeCategory = ["anti-social-behaviour","bicycle-theft","burglary","criminal-damage-arson","drugs","other-theft","possession-of-weapons","public-order","robbery","shoplifting","theft-from-the-person","vehicle-crime","violent-crime","other-crime"];

    getCount(character:any) {
      return this.chartData.filter(obj => obj.category === character).length;
    }
  
    getCount2(character:any) {
      return this.chartData.filter(obj => obj.month === character).length;
    }

    

    public chart1: any;
    public chart2: any;

    createChart1(chartData:any, xAxis:any, chartType:any){
  
        this.chart1 = new Chart("yearChart", {
          type: chartType,
    
          data: {
            labels: xAxis, 
               datasets: [{
                label: 'data',
                data: chartData,
                backgroundColor: '#21F398',
              }]
            },
            options: {
              plugins: {
                legend: false,
              }
            }
        });
    
        
      }
      createChart2(chartData:any, xAxis:any, chartType:any) {
  
        this.chart2 = new Chart("crimeChart", {
          type: chartType,
    
          data: {
            labels: xAxis, 
               datasets: [{
                label: "Data",
                data: chartData,
                backgroundColor: '#21F398',
              }]
            },
            options: {
              plugins: {
                legend: false,
              }
            }
          
    
        });
    
        
      }

        async toCoords(APIData:[], searchWithin:any){
      var points = turf.points(
        await Promise.all(APIData.map(async (item: { location: { latitude: any; longitude: any; }; }) =>  {return Object.values({latitude: item.location.latitude, longitude: item.location.longitude }) })
      ));
      
      return JSON.parse(
        JSON.stringify(
          turf.pointsWithinPolygon(points, searchWithin))).features.map(
            (item: { geometry: { coordinates: any[]; }; }) => {return Object.values({latitude:item.geometry.coordinates[0],longitude:item.geometry.coordinates[1]})}
          ).flat();
    }

    async filterData(APIDataset:[], pointsArray:any){
        return APIDataset.filter(function (el:any) {
            if (pointsArray.includes(el.location.latitude && el.location.longitude)){
              return el;
            };
          });
    };

    

    
    
    
    
    
}