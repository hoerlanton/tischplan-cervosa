import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Table } from '../../../../../Table';
import { TischplanService } from '../../../services/tischplan.service';

@Component({
  selector: 'app-tableplan',
  templateUrl: 'tableplan.component.html',
  styleUrls: ['../tischplan.component.css']
})

export class TableplanComponent implements AfterViewInit {
  @Input('tablesWintergarten') tablesWintergarten: Table[];
  @Input('showWintergartenBool') showWintergartenBool: boolean;
  @Input('tablesSonnbergZirbn') tablesSonnbergZirbn: Table[];
  @Input('showSonnbergZirbnBool') showSonnbergZirbnBool: boolean;
  @Input('tablesPanorama') tablesPanorama: Table[];
  @Input('showPanoramaBool') showPanoramaBool: boolean;
  @Input('tablesRestaurant') tablesRestaurant: Table[];
  @Input('showRestaurantBool') showRestaurantBool: boolean;
  @Input('showAlleBool') showAlleBool: boolean;
  @Input('showTablePlanBool') showTablePlanBool: boolean;
  @Output()
  movedSonnbergZirbn: EventEmitter<any> = new EventEmitter();
  @Output()
  movedRestaurant: EventEmitter<any> = new EventEmitter();
  @Output()
  movedWintergarten: EventEmitter<any> = new EventEmitter();
  @Output()
  movedPanorama: EventEmitter<any> = new EventEmitter();
  @Output()
  changeBgColorIfAnreise: EventEmitter<any> = new EventEmitter();
  @Output()
  kiWintergartenExport:EventEmitter<any> = new EventEmitter();
  @Output()
  erwWintergartenExport:EventEmitter<any> = new EventEmitter();
  @Output()
  erwRestaurantExport:EventEmitter<any> = new EventEmitter();
  @Output()
  kiRestaurantExport:EventEmitter<any> = new EventEmitter();
  @Output()
  erwPanoramaExport:EventEmitter<any> = new EventEmitter();
  @Output()
  kiPanoramaExport:EventEmitter<any> = new EventEmitter();
  @Output()
  erwSonnbergZirbnExport:EventEmitter<any> = new EventEmitter();
  @Output()
  kiSonnbergZirbnExport:EventEmitter<any> = new EventEmitter();

  buttonMoveTable: string;
  buttonInfo: string;
  buttonHinzufuegen: string;
  buttonEntfernen: string;
  trace: boolean;
  erwSonnbergZirbn: any[] = [];
  kiSonnbergZirbn: any[] = [];
  erwPanorama: any[] = [];
  kiPanorama: any[] = [];
  erwRestaurant: any[] = [];
  kiRestaurant: any[] = [];
  erwWintergarten: any[] = [];
  kiWintergarten: any[] = [];

  constructor(private tischplanService: TischplanService) {
    this.buttonMoveTable = "ff0000";
    this.buttonInfo = "ffffff";
    this.buttonHinzufuegen = "ffffff";
    this.buttonEntfernen = "ffffff";
    this.trace = false;
  }

  ngAfterViewInit() {
  }

  addTable(table, j) {
    console.log("moveTable clicked");
    console.log('table :' + table.number + 'j' + j);
    this.tischplanService.addTable(table).subscribe(response => {

      for (let a = 0; a < response[0].tables.length; a++) {
        response[0].tables.sort(function (a, b) {
          if (Number(a.number) < Number(b.number))
            return -1;
          if (Number(a.number) > Number(b.number))
            return 1;
          return 0;
        });
      }

      console.log('Response:' + JSON.stringify(response));
      //console.log("topValue:" + JSON.stringify(response[0].tables[0].topValue));
      console.log("topValue:" + JSON.stringify(response[0].tables[j].topValue));
      console.log("leftValue:" + JSON.stringify(response[0].tables[j].leftValue));
      console.log("response[0].tables.department" + response[0].tables[j].department);

      if (response === null) {
        return;
      } else {
        if (response[0].tables[j].department === "Sonnberg-Zirbn") {
          this.movedSonnbergZirbn.emit(response[0].tables);
          //this.tablesSonnbergZirbn = response[0].tables;
        }
        else if (response[0].tables[j].department === "Panorama") {
          this.movedPanorama.emit(response[0].tables);
          //this.tablesPanorama = response[0].tables;
          //this._navService.changeNav(response[0].tables);
        }
        else if (response[0].tables[j].department === "Restaurant") {
          this.movedRestaurant.emit(response[0].tables);
          //this.tablesRestaurant = response[0].tables;
        }
        else if (response[0].tables[j].department === "Wintergarten") {
          this.movedWintergarten.emit(response[0].tables);
          //this.tablesWintergarten = response[0].tables;
        }
      }
      this.changeBgColorIfAnreise.emit();
    });
  }

  removeTable(table, j) {
    console.log("moveTable clicked");
    console.log('table :' + table.number + 'j' + j);
    this.tischplanService.removeTable(table).subscribe(response => {

      for (let a = 0; a < response[0].tables.length; a++) {
        response[0].tables.sort(function (a, b) {
          if (Number(a.number) < Number(b.number))
            return -1;
          if (Number(a.number) > Number(b.number))
            return 1;
          return 0;
        });
      }

      console.log('Response:' + JSON.stringify(response));
      //console.log("topValue:" + JSON.stringify(response[0].tables[0].topValue));
      console.log("topValue:" + JSON.stringify(response[0].tables[j].topValue));
      console.log("leftValue:" + JSON.stringify(response[0].tables[j].leftValue));
      console.log("response[0].tables.department" + response[0].tables[j].department);
      if (response === null) {
        return;
      } else {
        if (response[0].tables[j].department === "Sonnberg-Zirbn") {
          this.movedSonnbergZirbn.emit(response[0].tables);
          //this.tablesSonnbergZirbn = response[0].tables;
        }
        else if (response[0].tables[j].department === "Panorama") {
          this.movedPanorama.emit(response[0].tables);
          //this.tablesPanorama = response[0].tables;
          //this._navService.changeNav(response[0].tables);
        }
        else if (response[0].tables[j].department === "Restaurant") {
          this.movedRestaurant.emit(response[0].tables);
          //this.tablesRestaurant = response[0].tables;
        }
        else if (response[0].tables[j].department === "Wintergarten") {
          this.movedWintergarten.emit(response[0].tables);
          //this.tablesWintergarten = response[0].tables;
        }
      }
      this.changeBgColorIfAnreise.emit();
    });
  }

  getStyle(a) {
    //console.log("a");
    //console.log(a);
    if (typeof a === "undefined") {
      return "solid 3px rgb(243, 239, 228)";
    } else {
      for (let b = 0; b < a.length; b++) {
        //console.log("LOOOOOOOOOOOOOOP");
        //console.log(a[b].traceValue);
        if (a[b].traceValue != "-" || a[b].newTraceText) {
          this.trace = true;
        }
      }
      if (this.trace) {
        this.trace = false;
        return "solid 3px red";
      } else {
        return "solid 3px rgb(243, 239, 228)";
      }
    }
  }

  none(event) {
    event.stopPropagation();
  }

  mouseEnterMoveTableButton() {
    console.log("mouse enter : ");
    if (this.buttonMoveTable === "ff0000") {
      console.log('mouse enter1 :');
      this.buttonMoveTable = "bc0000";
    }
  }

  mouseLeaveMoveTableButton() {
    if (this.buttonMoveTable === "bc0000") {
      console.log('mouse leave1 :');
      this.buttonMoveTable = "ff0000";
    }
  }

  mouseEnterInfoButton() {
    console.log("mouse enter : ");
    if (this.buttonInfo === "ffffff") {
      console.log('mouse enter1 :');
      this.buttonInfo = "cfcfcf";
    }
  }

  mouseLeaveInfoButton() {
    if (this.buttonInfo === "cfcfcf") {
      console.log('mouse leave1 :');
      this.buttonInfo = "ffffff";
    }
  }

  mouseEnterHinzufuegenButton() {
    console.log("mouse enter : ");
    if (this.buttonHinzufuegen === "ffffff") {
      console.log('mouse enter1 :');
      this.buttonHinzufuegen = "cfcfcf";
    }
  }

  mouseLeaveHinzufuegenButton() {
    if (this.buttonHinzufuegen === "cfcfcf") {
      console.log('mouse leave1 :');
      this.buttonHinzufuegen = "ffffff";
    }
  }

  mouseEnterEntfernenButton() {
    console.log("mouse enter : ");
    if (this.buttonEntfernen === "ffffff") {
      console.log('mouse enter1 :');
      this.buttonEntfernen = "cfcfcf";
    }
  }

  mouseLeaveEntfernenButton() {
    if (this.buttonEntfernen === "cfcfcf") {
      console.log('mouse leave1 :');
      this.buttonEntfernen = "ffffff";
    }
  }

  getStyleTrace(j) {
    if (j != "-") {
      return "solid 3px red";
    } else {
      return "";
    }
  }

  sumUpPersonenAnzahl(){
    console.log("sumUpPersonenAnzahl called");
    if (this.tablesSonnbergZirbn) {
      for (let p = 0; p < this.tablesSonnbergZirbn.length; p++) {
        this.erwSonnbergZirbn[p] = 0;
        this.kiSonnbergZirbn[p] = 0;
        if (this.tablesSonnbergZirbn[p].groups) {
          for (let g = 0; g < this.tablesSonnbergZirbn[p].groups.length; g++) {
            if (this.tablesSonnbergZirbn[p].groups[g].personenAnzahlValue) {
              let erwKi = this.tablesSonnbergZirbn[p].groups[g].personenAnzahlValue.match(/\d+/g);
              if (erwKi != null) {
                //console.log(erwKi);
                this.erwSonnbergZirbn[p] = this.erwSonnbergZirbn[p] + Number(erwKi[0]);
                //console.log(this.erw[p]);
              }
              if (erwKi != null) {
                //console.log(erwKi);
                this.kiSonnbergZirbn[p] = this.kiSonnbergZirbn[p] + Number(erwKi[1]);
                //console.log(this.ki[p]);
              }
            }
          }
        }
      }
    }
    if (this.tablesPanorama) {
      for (let p = 0; p < this.tablesPanorama.length; p++) {
        this.erwPanorama[p] = 0;
        this.kiPanorama[p] = 0;
        if (this.tablesPanorama[p].groups) {
          for (let g = 0; g < this.tablesPanorama[p].groups.length; g++) {
            if (this.tablesPanorama[p].groups[g].personenAnzahlValue) {
              let erwKi = this.tablesPanorama[p].groups[g].personenAnzahlValue.match(/\d+/g);
              if (erwKi != null) {
                //console.log(erwKi);
                this.erwPanorama[p] = this.erwPanorama[p] + Number(erwKi[0]);
                //console.log(this.erw[p]);
              }
              if (erwKi != null) {
                //console.log(erwKi);
                this.kiPanorama[p] = this.kiPanorama[p] + Number(erwKi[1]);
                //console.log(this.ki[p]);
              }
            }
          }
        }
      }
    }
    if (this.tablesRestaurant) {
      for (let p = 0; p < this.tablesRestaurant.length; p++) {
        this.erwRestaurant[p] = 0;
        this.kiRestaurant[p] = 0;
        if (this.tablesRestaurant[p].groups) {
          for (let g = 0; g < this.tablesRestaurant[p].groups.length; g++) {
            if (this.tablesRestaurant[p].groups[g].personenAnzahlValue) {
              let erwKi = this.tablesRestaurant[p].groups[g].personenAnzahlValue.match(/\d+/g);
              if (erwKi != null) {
                //console.log(erwKi);
                this.erwRestaurant[p] = this.erwRestaurant[p] + Number(erwKi[0]);
                //console.log(this.erw[p]);
              }
              if (erwKi != null) {
                //console.log(erwKi);
                this.kiRestaurant[p] = this.kiRestaurant[p] + Number(erwKi[1]);
                //console.log(this.ki[p]);
              }
            }
          }
        }
      }
    }
    if (this.tablesWintergarten) {
      for (let p = 0; p < this.tablesWintergarten.length; p++) {
        this.erwWintergarten[p] = 0;
        this.kiWintergarten[p] = 0;
        if (this.tablesWintergarten[p].groups) {
          for (let g = 0; g < this.tablesWintergarten[p].groups.length; g++) {
            if (this.tablesWintergarten[p].groups[g].personenAnzahlValue) {
              let erwKi = this.tablesWintergarten[p].groups[g].personenAnzahlValue.match(/\d+/g);
              if (erwKi != null) {
                //console.log(erwKi);
                this.erwWintergarten[p] = this.erwWintergarten[p] + Number(erwKi[0]);
                //console.log(this.erw[p]);
              }
              if (erwKi != null) {
                //console.log(erwKi);
                this.kiWintergarten[p] = this.kiWintergarten[p] + Number(erwKi[1]);
                //console.log(this.ki[p]);
              }
            }
          }
        }
      }
    }
    this.kiWintergartenExport.emit(this.kiWintergarten);
    this.erwWintergartenExport.emit(this.erwWintergarten);
    this.erwRestaurantExport.emit(this.erwRestaurant);
    this.kiRestaurantExport.emit(this.kiRestaurant);
    this.erwPanoramaExport.emit(this.erwPanorama);
    this.kiPanoramaExport.emit(this.kiPanorama);
    this.erwSonnbergZirbnExport.emit(this.erwSonnbergZirbn);
    this.kiSonnbergZirbnExport.emit(this.kiSonnbergZirbn);
  }
}
