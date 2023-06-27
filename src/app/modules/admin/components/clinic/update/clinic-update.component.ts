import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Countries } from '../../../models/address/country.model';
import { Clinic } from '../../../models/clinic.model';
import { countries } from '../../../models/data/country-data-store';
import { states } from '../../../models/data/state-data-store';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-clinic-update',
  templateUrl: './clinic-update.component.html',
  styleUrls: ['./clinic-update.component.css']
})
export class ClinicUpdateComponent implements OnInit {
  clinicId: string | null;
  countries: Countries[] = countries;
  states: string[] = states;
  @ViewChild('clinicCreateForm') clinicCreateForm: NgForm;
  form = {
    name: '',
    clinicaddressvalue: '',
    clinicaddresscountry: '',
    clinicaddressstate: '',
    clinicaddressprovince: '',
    clinicaddresscity: '',
    clinicaddresszipcode: ''
  };
  errorMessage: string | null;
  constructor(private activatedRoute: ActivatedRoute
    , private clinicService: ClinicService
    , private router: Router) { }

  ngOnInit(): void {
    this.clinicId = this.activatedRoute.snapshot.paramMap.get('clinicId') !== null ? this.activatedRoute.snapshot.paramMap.get('clinicId') : '';
    this.clinicService.getById(this.clinicId).subscribe((result) => {
      var addressParts: string[] = this.converStringToAddress(result.address)
      this.form.name = result.name !== null ? result.name : '';
      this.form.clinicaddressvalue = result.address !== null ? addressParts[0] : '';
      this.form.clinicaddresscountry = result.address !== null ? addressParts[1] : '';
      if (this.form.clinicaddresscountry !== 'United States of America')
        this.form.clinicaddressprovince = result.address !== null ? addressParts[2] : '';
      else
        this.form.clinicaddressstate = result.address !== null ? addressParts[2] : '';
      this.form.clinicaddresscity = result.address !== null ? addressParts[3] : '';
      this.form.clinicaddresszipcode = result.address !== null ? addressParts[4] : '';
    })
  }
  converStringToAddress(address: string | null) {
    var result: string[] | undefined = address?.split(",")
    return result !== undefined ? result : ['']
  }
  update() {
    var clinic: Clinic = {
      id: Number(this.clinicId),
      name: this.form.name,
      address: this.convertAddressToString(),
      selected: false
    }

    if (this.clinicCreateForm.valid) {
      this.clinicService.create(clinic).subscribe(
        (response) => {
          this.router.navigateByUrl('admin/clinic/list')
        },
        (error) => { console.log(error); });
    } else {
      console.log('not valid')
      this.errorMessage = 'Please enter valid data';
    }
  }
  convertAddressToString(): string {
    let address: string = ""
    address = address + this.form.clinicaddressvalue + ",";
    address = address + this.form.clinicaddresscountry + ",";
    if (this.form.clinicaddressstate)
      address = address + this.form.clinicaddressstate + ",";
    if (this.form.clinicaddressprovince)
      address = address + this.form.clinicaddressprovince + ",";
    address = address + this.form.clinicaddresscity + ",";
    address = address + this.form.clinicaddresszipcode;
    return address
  }

  resetError() {

  }
}
