import { Component } from '@angular/core'; //required to use component element from Angular
import { DataTableComponent } from './data-table/data-table.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { TaskbarComponent } from './taskbar/taskbar.component';

@Component({
  selector: 'app-root', //which parts of the page is controled by this component
  standalone: true,
  imports:[TaskbarComponent, HeaderComponent, MapComponent, DataTableComponent],
  templateUrl: './app.component.html', //defines the template
  styleUrl: './app.component.css', //defines the style
})
export class AppComponent { 
}
