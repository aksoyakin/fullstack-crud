import { Component, OnInit } from '@angular/core';
import { Employee } from '../../common/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  
  id!: number;
  employee: Employee = new Employee();

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
  ){}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee();
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





}
