import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Table } from '../../../../../Table';
import { WintergartenComponent } from './wintergarten/wintergarten.component';
import {AllComponent} from "./all/all.component";
import {PanoramaComponent} from "./panorama/panorama.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {SonnbergZirbnComponent} from "./sonnberg-zirbn/sonnberg-zirbn.component";

@Component({
  selector: 'app-departments',
  templateUrl: 'departments.component.html',
  styleUrls: ['../main.component.css']
})

export class DepartmentsComponent {

  @Input('tablesWintergarten') tablesWintergarten: Table[];
  @Input('showWintergartenBool') showWintergartenBool: boolean;
  @Input('tablesSonnbergZirbn') tablesSonnbergZirbn: Table[];
  @Input('showSonnbergZirbnBool') showSonnbergZirbnBool: boolean;
  @Input() tablesPanorama: Table[];
  @Input('tables') tables: any;
  @Input('showPanoramaBool') showPanoramaBool: boolean;
  @Input('tablesRestaurant') tablesRestaurant: Table[];
  @Input('showRestaurantBool') showRestaurantBool: boolean;
  @Input('showAllBool') showAllBool: boolean;
  @Input() tablesTempDeparture: any;
  @Input('term') term: string;
  @ViewChild(AllComponent)
  private allComponent: AllComponent;

  @ViewChild(PanoramaComponent)
  private panoramaComponent: PanoramaComponent;

  @ViewChild(RestaurantComponent)
  private restaurantComponent: RestaurantComponent;

  @ViewChild(WintergartenComponent)
  private wintergartenComponent: WintergartenComponent;

  @ViewChild(SonnbergZirbnComponent)
  private sonnbergZirbnComponent: SonnbergZirbnComponent;

  @Output()
  dispensedSonnbergZirbn:EventEmitter<any> = new EventEmitter();
  @Output()
  dispensedRestaurant:EventEmitter<any> = new EventEmitter();
  @Output()
  dispensedWintergarten:EventEmitter<any> = new EventEmitter();
  @Output()
  dispensedPanorama:EventEmitter<any> = new EventEmitter();
  @Output()
  updateAzList:EventEmitter<any> = new EventEmitter();
  @Output()
  updateImHausListElement:EventEmitter<any> = new EventEmitter();
  dateTodayGenerated: any;
  parts: any[] = [];
  date: any[] = [];
  parsedDate: any[] = [];
  a: any;
  b: any;
  tablesChangeBgColorIfArrival: any;

  constructor( private mainService: MainService) {
  }

  ngOnInit() {
  }

  occupied(table) {
    console.log("table.j");
    console.log(table.j);
    console.log("table.table");
    console.log(table.table);
    this.occupy(table.table, table.j);
  }

  occupy(table, j) {
    this.mainService.dispenseTable(table).subscribe(response => {
      console.log("Dispense Table:");
      console.log("bgColor:" + JSON.stringify(response[0].tables[j].bgColor));
      console.log("isOccupied:" + JSON.stringify(response[0].tables[j].isOccupied));
      console.log(JSON.stringify(response));

      if (response === null || typeof response[0].tables[j].groups == null) {
        return;
      } else {

        response[0].tables.sort(function (a, b) {
          if (Number(a.number) < Number(b.number))
            return -1;
          if (Number(a.number) > Number(b.number))
            return 1;
          return 0;
        });

        if (response[0].tables[j].department === "Sonnberg-Zirbn") {
          this.dispensedSonnbergZirbn.emit(response[0].tables);
        } else if (response[0].tables[j].department === "Panorama") {
          this.dispensedPanorama.emit(response[0].tables);
        } else if (response[0].tables[j].department === "Restaurant") {
          this.dispensedRestaurant.emit(response[0].tables);
        } else if (response[0].tables[j].department === "Wintergarten") {
          this.dispensedWintergarten.emit(response[0].tables);
          console.log("Wintergarten" + JSON.stringify(response[0].tables));
        }
      }
    },
      error => console.log("Error: ", error),
      () => {
        console.log(table);
        this.updateAzList.emit();
        if (table.length > 1) {
          for (let i = 0; i < table.length; i++) {
            this.updateImHausListElement.emit(table[i].table);
          }
        } else {
          if (table.constructor === Array) {
            console.log("isarray");
            this.updateImHausListElement.emit(table[0].table);
          } else {
            this.updateImHausListElement.emit(table);
          }
        }
      });

    this.mainService.addPlaceholder(table).subscribe(response => {
      console.log("Add placeholder!");
      //console.log(this.tablesSonnbergZirbn[j].placeholder);
      console.log("placeholder:" + JSON.stringify(response));

    });

  }

  addInformationToTable(dataString, arrayIndex) {
    console.log("dataString");
    console.log(dataString);
    this.mainService.addInformationToTable(dataString)
      .subscribe(response => {
          // let arrayIndex = response[1];
          console.log("RESPONSE addInformationToTable:" + JSON.stringify(response));
          if (response === null) {
            return;
          } else {
            if (response[0].department === "Sonnberg-Zirbn") {
              this.dispensedSonnbergZirbn.emit(response[0].tables);
            }
            else if (response[0].department === "Panorama") {
              this.dispensedPanorama.emit(response[0].tables);
            }
            else if (response[0].department === "Restaurant") {
              this.dispensedRestaurant.emit(response[0].tables);
            }
            else if (response[0].department === "Wintergarten") {
              this.dispensedWintergarten.emit(response[0].tables);
            }
          }
        }
        // console.log(this.tablesSonnbergZirbn[arrayIndex]);
      )
  };

  occupyTableOnDrop(dataString, arrayIndex) {
    console.log("Occupy Table!");
    console.log(dataString);
    this.mainService.occupyTable(dataString)
      .subscribe(response => {
        //let arrayIndex = response[1];
        //console.log("arrayIndex:" + arrayIndex);
        //console.log("bgColor:" + JSON.stringify(response[0].tables[arrayIndex].bgColor));

        console.log("Response occupyTable:" + JSON.stringify(response));
        if (response === null) {
          return;
        } else {
          if (response.tables[0].department === "Sonnberg-Zirbn") {
            this.tablesSonnbergZirbn[arrayIndex] = response.tables[0];
          }
          else if (response.tables[0].department === "Panorama") {
            this.tablesPanorama[arrayIndex] = response.tables[0];
          }
          else if (response.tables[0].department === "Restaurant") {
            this.tablesRestaurant[arrayIndex] = response.tables[0];
          }
          else if (response.tables[0].department === "Wintergarten") {
            this.tablesWintergarten[arrayIndex] = response.tables[0];
          }
        }
        this.updateAzList.emit();
      });
  }

  changeBgColorIfArrival() {
    setTimeout(() => {
      this.tablesChangeBgColorIfArrival = this.tablesTempDeparture;
      //console.log('changeBgColorIfArrival calld');
      //console.log(this.tablesChangeBgColorIfArrival);
      this.dateTodayGenerated = new Date();
      this.parts = [];
      this.parsedDate = [];
      this.date = [];

      for (let a = 0; a < this.tablesChangeBgColorIfArrival.length; a++) {
        for (let b = 0; b < this.tablesChangeBgColorIfArrival[a].tables.length; b++) {
          if (this.tablesChangeBgColorIfArrival[a].tables[b].groups) {
            for (let c = 0; c < this.tablesChangeBgColorIfArrival[a].tables[b].groups.length; c++) {
              if (this.tablesChangeBgColorIfArrival[a].tables[b].groups[c].arrivalValue) {
                //console.log('tablesChangeBgColorIfArrival[a].tables[b].groups[c].arrivalValue: ' + c + " " + this.tablesChangeBgColorIfArrival[a].tables[b].groups[c].arrivalValue);
                this.parts[0] = this.tablesChangeBgColorIfArrival[a].tables[b].groups[c].arrivalValue.match(/(\d+)/g);
              } else {
                this.parts[0] = "undefined";
              }
              if (this.parts[0]) {
                this.date[0] = new Date(2018, this.parts[0][1] - 1, this.parts[0][0]);
                this.parsedDate[0] = String(this.date[0]).substring(0, 15);
              }
              // note parts[1]-1
              // console.log('parts[2]' + parts[2] + 'parts[1]' + (parts[1] - 1) + 'parts[0]' + parts[0]);
              // Mon May 31 2010 00:00:00
              // this.tablesRestaurant[j].arrivalValue
              let dateToday = String(this.dateTodayGenerated).substring(0, 15);
              //console.log('Parsed Date --->: ' + this.parsedDate[0]);
              //console.log('this.dateGenerated --->: ' + dateToday);
              if (dateToday.indexOf(this.parsedDate[0]) !== -1) {
                if (this.tablesChangeBgColorIfArrival[a].department === "Panorama") {
                  //console.log(this.tablesPanorama);
                  if (this.tablesPanorama[b]) {
                    //console.log(this.tablesPanorama[b]);
                    this.tablesPanorama[b].bgColor = "#0a7a74";
                  }
                }
                else if (this.tablesChangeBgColorIfArrival[a].department === "Wintergarten") {
                  if (this.tablesWintergarten[b]) {
                    this.tablesWintergarten[b].bgColor = "#0a7a74";
                  }
                }
                else if (this.tablesChangeBgColorIfArrival[a].department === "Sonnberg-Zirbn") {
                  if (this.tablesSonnbergZirbn[b]) {
                    this.tablesSonnbergZirbn[b].bgColor = "#0a7a74";
                  }
                }
                else if (this.tablesChangeBgColorIfArrival[a].department === "Restaurant") {
                  if (this.tablesRestaurant[b]) {
                    this.tablesRestaurant[b].bgColor = "#0a7a74";
                  }
                }
              }
            }
          }
        }
      }
    }, 1000);
  }

  transform(term) {
      if (this.showPanoramaBool) {
      this.panoramaComponent.transform(this.tablesPanorama, term);
       } else if (this.showRestaurantBool) {
       this.restaurantComponent.transform(this.tablesRestaurant, term);
       } else if (this.showWintergartenBool) {
       this.wintergartenComponent.transform(this.tablesWintergarten, term);
       } else if (this.showSonnbergZirbnBool) {
       this.sonnbergZirbnComponent.transform(this.tablesSonnbergZirbn, term);
       } else if (this.showAllBool) {
        this.allComponent.transform(this.tables, term);

      }
    }
}
