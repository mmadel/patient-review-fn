import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/security/model/user';
import { Countries } from '../../../models/address/country.model';
import { Clinic } from '../../../models/clinic.model';
import { countries } from '../../../models/data/country-data-store';
import { states } from '../../../models/data/state-data-store';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { UserService } from '../../../services/user/user.service';
interface UserRole {
  name: string;
  value: string
}
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  countries: Countries[] = countries;
  states: string[] = states;
  userRoles: UserRole[] = [
    { name: "Administrator", value: "ADMIN" },
    { name: "Normal User", value: "USER" }
  ]
  errorMessage: string | null;
  returnClinics: Clinic[] = new Array();
  @ViewChild('userCreateForm') userCreateForm: NgForm;
  form = {
    name: null,
    password: null,
    useraddress: null,
    useraddresscountry: null,
    useraddressstate: null,
    useraddressprovince: null,
    useraddresscity: null,
    useraddresszipcode: null,
    userrole: null,
    selectedClinics: null
  };
  constructor(private clinicService: ClinicService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.clinicService.get().subscribe(response => {
      response.body?.forEach(element => {
        this.returnClinics?.push(element)
      });
    },
      error => {
        
      },
    )
  }
  create(event: any) {
    if (event.submitter.innerHTML === ' Select all options '){
      return;
    }
      
    var user: User = {
      id: null,
      name: this.form.name,
      password: this.form.password,
      address: this.convertAddressToString(),
      userRole: this.form.userrole,
      clinics: this.createClinics(this.form.selectedClinics)
    }
    if (this.userCreateForm.valid) {
      this.userService.create(user).subscribe(
        (response) => {
          this.router.navigateByUrl('admin/user/list')
        },
        (error) => { this.errorMessage = error.error.error });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
  }
  resetError() {

  }
  convertAddressToString(): string {
    let address: string = ""
    address = address + this.form.useraddress + ",";
    address = address + this.form.useraddresscountry + ",";
    if (this.form.useraddressstate)
      address = address + this.form.useraddressstate + ",";
    if (this.form.useraddressprovince)
      address = address + this.form.useraddressprovince + ",";
    address = address + this.form.useraddresscity + ",";
    address = address + this.form.useraddresszipcode;
    return address
  }

  createClinics(ids: string[] | null) {
    var clinics: Clinic[] = new Array();
    ids?.forEach(element => {
      var clinic: Clinic = {
        id: Number(element),
        name: null,
        address: "",
        selected: false,

      }
      clinics.push(clinic)
    });
    return clinics;
  }
}
