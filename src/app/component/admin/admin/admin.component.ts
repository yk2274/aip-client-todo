import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: String[] = [];

  constructor(
    private adminService: AdminService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.adminService.getTasks().subscribe(users => {
      this.users = users;
    });
  }

  navigateToTask() {
    this.router.navigate(['/task'])
  }

}
