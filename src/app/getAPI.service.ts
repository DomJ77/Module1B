import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIData } from './APIData'; // Import the Comment interface
import { forkJoin, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GetAPIService  {

  constructor(private http: HttpClient){}
  private Plymouth = '50.3955491,-4.2093521:50.3802262,-4.1894394:50.3648984,-4.192186:50.3633654,-4.1726166:50.3388298,-4.157167:50.3414592,-4.0143448:50.4032087,-4.0054184:50.4012392,-4.0696197:50.4347093,-4.0788894:50.4480471,-4.1056686:50.4320851,-4.1928726:50.3955491,-4.2093521';
  public dataYear:APIData[] = [];

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
 
  async getAPIData(){

    const dataJan= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-01");
    await this.delay(1000);
    const dataFeb= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-02");
    await this.delay(1000);
    const dataMar= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-03");
    await this.delay(1000);
    const dataApr= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-04");
    await this.delay(1000);
    const dataMay= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-05");
    await this.delay(1000);
    const dataJun= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-06");
    await this.delay(1000);
    const dataJul= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-07");
    await this.delay(1000);
    const dataAug= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-08");
    await this.delay(1000);
    const dataSep= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-09");
    await this.delay(1000);
    const dataOct= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-10");
    await this.delay(1000);
    const dataNov= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-11");
    await this.delay(1000);
    const dataDec= this.http.get<APIData[]>("https://data.police.uk/api/crimes-street/all-crime?poly=" + this.Plymouth + "&date=2023-12");
    await this.delay(1000);
    return forkJoin([dataJan,dataFeb,dataMar,dataApr,dataMay,dataJun,dataJul,dataAug,dataSep,dataOct,dataNov,dataDec]).pipe(map(data => data.reduce((result:any,arr:any)=>[...result,...arr],[])));
    

  }

}