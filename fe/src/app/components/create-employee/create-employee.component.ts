import { Component, OnInit } from '@angular/core';
import { Employee } from '../../common/employee';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private router: Router,
  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe
    (data => {
      console.log(data);
      this.goToEmployeeList();
    }, error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }

  onSubmit() {
    console.log(this.employee);
    this.saveEmployee();
  }

}
