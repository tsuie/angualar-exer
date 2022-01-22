import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FacilityService } from '../../services/facility/facility.service';
import { AddFacilityComponent } from './add-facility/add-facility.component';
import { DeleteFacilityComponent } from './delete-facility/delete-facility.component';
import { MatDialog } from '@angular/material/dialog';
import { IFacility } from 'src/app/models/facility.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})


export class FacilityComponent implements OnInit {
  ELEMENT_DATA: IFacility[] = [];
  displayedColumns: string[] = [
    'facility_number',
    'facility',
    'address1',
    'city',
    'state',
    'phone1',
    'id'
  ];
  dataSource = this.ELEMENT_DATA;
  facilities: object = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private _facilityService: FacilityService,
    public dialog: MatDialog
  ) {

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

  openDeleteFacility(data: object): void {
    const dialogRef = this.dialog.open(DeleteFacilityComponent,
      { width: '600px', data: data }
    )
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
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
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this._facilityService.read((this.currentPage + 1) ).subscribe(res => {
      this.facilities = res;
      this.dataSource = res.data;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = res.meta?.total;
      });
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
    console.log('');
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
}
