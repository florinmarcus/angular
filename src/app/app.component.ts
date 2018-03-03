import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  regions = [];
  newRegion = { "regionName": '', "regionId": this.generateId() };
  formMode: String = "insert";

  @ViewChild('f') form: NgForm;
  formTitle: String = "Add new Region";
  //true on Update Form


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  constructor(private serverService: ServerService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * persists the edited region (both for insert and update)
   * @param form  
   */
  onSaveRegion(form: NgForm) {

    console.debug(this.formMode);

    if (!form.valid)
      return;

    var newRegion = { "regionName": form.value.regionName, "regionId": form.value.regionId };

    this.serverService.addRegion(newRegion)
      .subscribe(
      (response) => form.resetForm(),
      (error) => this.openSnackBar(error, null)
      );
    console.log(this.formMode == 'insert');

    if (this.formMode == 'insert') {
      this.regions.push(newRegion);
    }
    else if (this.formMode == 'update') {

      var pos = this.regions.map(function (e) { return e.regionId; }).indexOf(newRegion.regionId);
      console.log(pos);
      this.regions[pos] = newRegion;
    }

  }

  onEditRegion(region: any) {

    this.form.setValue({
      regionName: region.regionName,
      regionId: region.regionId,
    });

    this.formMode = "update";
    this.formTitle = "Edit Region";
  }



  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  loadData() {
    this.serverService.getRegions()
      .subscribe(
      (regions: any[]) => this.regions = regions['regions'],
      (error) => console.log(error)
      );
  }

  onDeleteRegion(regionId: number) {
    console.log('delete pressed' + regionId);
    this.serverService.deleteRegion(regionId)
      .subscribe(
      (response) => this.loadData(),
      (error) => this.openSnackBar(error, null)

      );
  }

  /**
   * clears the form data, returning it to Insert mode
   */
  onCancel() {

    this.form.resetForm();
    this.formMode = "insert";
    this.formTitle = "Add New Region";
  }

  /**
   * method that disables the regionId input field on UPDATE 
   */
  get regionIdDisabled(): Boolean {
    return this.formMode == "update";
  }


}


