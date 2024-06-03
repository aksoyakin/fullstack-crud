import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../common/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  id: number = 0;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.employee = data;
        },
        error: (error) => console.log(error),
        complete: () => console.log("Data init completed!")
      })
  }
  
  onSubmit(){
    this.updateEmployee();
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
        complete: () => this.goToEmployeeList()
      })
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}