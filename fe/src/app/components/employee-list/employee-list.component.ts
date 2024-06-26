import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../common/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,
    RouterLinkActive,
    RouterModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).
      subscribe({
        next: (data) => {
          console.log(data);
          this.getEmployees();
        },
        error: (error) => console.log(error)
      });
  }
  
}
