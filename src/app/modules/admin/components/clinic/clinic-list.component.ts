import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from '../../models/clinic.model';
import { ClinicService } from '../../services/clinic/clinic.service';
interface RenderedClinic {
  id: number | null,
  name: string | null,
  address: string | null,
  country: string | null,
  ps: string | null,
  zipcode: string | null
}
@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
  errorMessage: string | null = '';
  clinics: RenderedClinic[] | null = new Array();
  public visibleConfirmDelete = false;
  selectedClinic: RenderedClinic | undefined | null
  constructor(private router: Router, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.get().subscribe(response => {
      response.body?.forEach(element => {
        this.clinics?.push(this.constructClinic(element))
      });
    },
      error => {
      },
    )
  }
  create() {
    this.router.navigateByUrl('/admin/clinic/create');
  }
  private constructClinic(element: Clinic) {
    var splitted = element.address.split(",");
    var renderedClinic: RenderedClinic = {
      id: element.id,
      name: element.name,
      address: splitted[0],
      country: splitted[1],
      ps: splitted[2],
      zipcode: splitted[3]
    }
    return renderedClinic;
  }
  update(clinic: RenderedClinic | undefined | null) {
    this.router.navigate(['/admin/clinic/update', clinic?.id])
  }
  confirmDelete(clinic: RenderedClinic | undefined | null){
    this.visibleConfirmDelete = !this.visibleConfirmDelete;
    this.selectedClinic = clinic;
  }
  closeDeleteConfirmation(){
    this.visibleConfirmDelete = !this.visibleConfirmDelete;
  }
  handleDelete(){
    this.deleteClinic(this.selectedClinic?.id);
    this.visibleConfirmDelete = !this.visibleConfirmDelete;
  }
  deleteClinic(id: number | undefined | null) {
    this.clinicService.delete(id?.toString() || '{}').subscribe(() => {
      this.errorMessage =''
      location.reload();
    }, error => {
      this.errorMessage = error.error.error;
    },
    )
  }
}
