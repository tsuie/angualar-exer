import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FacilityService } from '../../services/facility/facility.service';
import { AddFacilityComponent } from './add-facility/add-facility.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})


export class FacilityComponent implements OnInit {
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = [
    'facility_number',
    'facility',
    'address1',
    'address2',
    'city',
    'state',
    'phone1',
    'phone2',
    'fax',
    'web_url',
  ];
  dataSource = this.ELEMENT_DATA;
  facilities: object = [];
  constructor(
    private fb: FormBuilder,
    private _facilityService: FacilityService,
    public dialog: MatDialog
  ) {
    this._facilityService.read().subscribe(res => {
      this.facilities = res;
      this.dataSource = res.data;
    }, error => {
      console.log(error);
    })
    console.log('');
  }

  openAddFacility(): void {
    const dialogRef = this.dialog.open(AddFacilityComponent,
      { width: '600px' }
    )
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openEditFacility(data: object): void {
    console.log('Edit Facility');
    const dialogRef = this.dialog.open(AddFacilityComponent,
      { width: '600px', data:{ ...data, method: 'edit'} }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    console.log(this.facilities);
  }
}
