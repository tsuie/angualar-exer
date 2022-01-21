import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacilityService } from 'src/app/services/facility/facility.service';
import { DOCUMENT } from '@angular/common';
import { IFacility } from 'src/app/models/facility.interface';

@Component({
  selector: 'app-delete-facility',
  templateUrl: './delete-facility.component.html',
  styleUrls: ['./delete-facility.component.css']
})
export class DeleteFacilityComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public prop: IFacility,
    private _facilityService: FacilityService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  onNoClick() {
    this.dialogRef.close()
    return ;
  }

  handleDelete() {
    console.log('Delete Triggered', this.prop);
    if(this.prop.id) {
      // trigger Delete
      // this.document.location.href = '/facility';
      this.deleteData().subscribe(
        res => {
          console.log(res);
          alert('Facility Deleted');
          this.document.location.href = '/facility';
        },
        err => {
          console.log(err)
        }
      )
    }
    else
      this.onNoClick()
  }

  deleteData() {
    return this._facilityService.delete(this.prop?.id);
  }
  ngOnInit(): void {
    console.log('Delete Dialog Open', this.prop);
  }

}
