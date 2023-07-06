import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/security/model/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = new Array();
  isLoggedIn: boolean;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.get().subscribe(response => {
      response.body?.forEach(element => {
        if (element.clinics?.length !== undefined && element.clinics?.length > 0) {
          if (element.userRole === 'ADMIN')
            element.userRole = "Administrator";
          if (element.userRole === 'USER')
            element.userRole = "Normal User";
          this.users?.push(element)
        }
      });
    },
      error => {
      },
    )
  }
  isLoggedInUser(id: string | null | undefined) {
    var userId: string = localStorage.getItem('userId') || '{}';
    this.isLoggedIn= userId == id ? true : false;
    return this.isLoggedIn;
  }
  create() {
    this.router.navigateByUrl('/admin/user/create');
  }
  deleteUser(id: string | undefined | null) {
    this.userService.delete(id || '{}').subscribe(() => {
      location.reload();
    })
  }

  update(id: string | undefined | null) {
    this.router.navigate(['/admin/user/update', id])
  }

}
