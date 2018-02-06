import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { MaterialModule } from './modules/material.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  regions = [];
  newRegion = { "regionName": '', "regionId": this.generateId() };

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    this.loadData();
  }

  onAddRegion(form: NgForm) {

    console.debug( form.value);

    //console.debug('xoxoxo' + this.newRegion.regionName);
 
    var newRegion = { "regionName": form.value.regioName, "regionId": form.value.regionId };

    this.serverService.addRegion(newRegion)
      .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      );

    this.regions.push(newRegion);
  
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
      (error) => console.log(error)

      );
  }

}


