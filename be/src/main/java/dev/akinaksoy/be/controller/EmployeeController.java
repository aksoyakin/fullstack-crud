package dev.akinaksoy.be.controller;

import dev.akinaksoy.be.exception.ResourceNotFoundException;
import dev.akinaksoy.be.model.Employee;
import dev.akinaksoy.be.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // create employee rest api
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    // get employee by id rest api
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with this id: " + id
                ));
        return ResponseEntity.ok(employee);
    }

    //u update employee rest api
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employeeDetails)
    {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with this id: " + id
                ));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        Employee updatedEmploye = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmploye);
    }
}
