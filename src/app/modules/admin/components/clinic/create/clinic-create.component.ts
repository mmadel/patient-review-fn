import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Countries } from '../../../models/address/country.model';
import { Clinic } from '../../../models/clinic.model';
import { countries } from '../../../models/data/country-data-store';
import { states } from '../../../models/data/state-data-store';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.css']
})
export class ClinicCreateComponent implements OnInit {
  countries: Countries[] = countries;
  states: string[] = states;
  @ViewChild('clinicCreateForm') clinicCreateForm: NgForm;
  form = {
    name: null,
    clinicaddressvalue: null,
    clinicaddresscountry: null,
    clinicaddressstate: null,
    clinicaddressprovince: null,
    clinicaddresscity: null,
    clinicaddresszipcode: null
  };
  errorMessage: string | null;
  constructor(private clinicService: ClinicService, private router: Router) { }

  ngOnInit(): void {
  }
  create() {
    var clinic: Clinic = {
      id: null,
      name: this.form.name,
      address: this.convertAddressToString(),
      selected: false
    }

    if (this.clinicCreateForm.valid) {
      this.clinicService.create(clinic).subscribe(
        (response) => {
          this.router.navigateByUrl('admin/clinic/list')
        },
        (error) => {  });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
  }
  resetError() {
    this.errorMessage = null;
  }
  convertAddressToString(): string {
    let address: string = ""
    address = address + this.form.clinicaddressvalue + ",";
    address = address + this.form.clinicaddresscountry + ",";
    if (this.form.clinicaddressstate)
      address = address + this.form.clinicaddressstate + ",";
    if (this.form.clinicaddressprovince)
      address = address + this.form.clinicaddressprovince + ",";
    address = address + this.form.clinicaddresszipcode;
    return address
  }
}
