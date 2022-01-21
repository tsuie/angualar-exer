import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';
import { FacilityService } from 'src/app/services/facility/facility.service';
import { DOCUMENT } from '@angular/common';
import { IFacility } from 'src/app/models/facility.interface';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.css']
})
export class AddFacilityComponent implements OnInit {
  facilityForm = this.fb.group({
    facility_number:  ['', [Validators.required]],
    facility:         ['', [Validators.required]],
    address1:         ['', [Validators.required, Validators.minLength(5)]],
    address2:         ['', [Validators.minLength(5)]],
    city:             ['', [Validators.required]],
    state:            ['', [Validators.required]],
    phone1:           ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    phone2:           ['', [Validators.pattern('[- +()0-9]+')]],
    fax:              ['', [Validators.pattern('[- +()0-9]+')]],
    web_url:          ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
  });
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<AddFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public prop: IFacility,
    private fb: FormBuilder,
    private _facilityService: FacilityService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    console.log('Add Facility Dialog ', this.prop)
  }

  onNoClick() {
    this.dialogRef.close()
    return ;
  }

  onSubmit(): void {
    this.loading = true;
    console.log('Submit Triggered: ', this.facilityForm);
    if(this.facilityForm.status === 'VALID') {
      this.saveData(this.facilityForm.value).subscribe(res => {
        console.log(res);
        // Success
        if(this.prop?.id) {
          alert('Facility Created Successfully');
        }
        else
          alert('Facility Created Successfully');
        this.document.location.href = '/facility';
      }, err => {
        console.log(err)
      })
    }
    // this.saveData(this.facilityForm.value).subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log(err)
    // })
    // this.dialogRef.close();
  }

  saveData(data: object) {
    return this._facilityService.create(data)
  }

}
