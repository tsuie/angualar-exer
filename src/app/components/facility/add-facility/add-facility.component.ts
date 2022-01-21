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
    id             :  [''],
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
    console.log('Add Facility Dialog ', this.prop);
    if(this.prop?.facility_number) {
      this.facilityForm.setValue({
        id: this.prop?.id || null,
        facility_number: (this.prop?.facility_number || ''),
        facility: (this.prop?.facility || ''),
        address1: (this.prop?.address1 || ''),
        address2: (this.prop?.address2 || ''),
        city: (this.prop?.city || ''),
        state: (this.prop?.state || ''),
        phone1: (this.prop?.phone1 || ''),
        phone2: (this.prop?.phone2 || ''),
        fax: (this.prop?.fax || ''),
        web_url: (this.prop?.web_url || ''),
      })
    }
  }

  onNoClick() {
    this.dialogRef.close()
    return ;
  }

  onSubmit(): void {
    this.loading = true;
    console.log('Submit Triggered: ', this.facilityForm);
    if(this.facilityForm.status === 'VALID') {
      if(this.prop.facility_number) {
        // Update Data
        console.log('From Data', this.prop);
        console.log('To Data', this.facilityForm.value);

        this.updateData(this.facilityForm.value).subscribe(res => {
          console.log(res);
          alert('Facility Updated Successfully');
          this.document.location.href = '/facility';
        });
      }
      else {
        // Create Data
        this.createData(this.facilityForm.value).subscribe(res => {
          console.log(res);
          // Success
          alert('Facility Created Successfully');

          this.document.location.href = '/facility';
        }, err => {
          console.log(err)
        })
      }

    }

  }
  updateData(data: IFacility) {
    return this._facilityService.update(data);
  }
  createData(data: IFacility) {
    return this._facilityService.create(data)
  }

}
