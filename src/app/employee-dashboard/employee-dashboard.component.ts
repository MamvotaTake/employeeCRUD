import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {faPencilAlt, faTrashAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faUserCircle = faUserCircle
  formValue !: FormGroup;
  employeeModelObject :EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
    })
    this.getAllEmployees();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;

    this.api.postEmployee(this.employeeModelObject)
    .subscribe(res => {
      console.log(res)
      alert("Employee Added Successfully")
      this.formValue.reset();
    }, 
    err=>{
      alert("Something Went Wrong")
    })
  }

  getAllEmployees() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any) {
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee deleted");
      this.getAllEmployees();
    })
  }

  onEditEmployee(row : any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObject.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
  }

  updateEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;

    this.api.updateEmployee(this.employeeModelObject, this.employeeModelObject.id)
    .subscribe(res => {
      alert("Updated Successfully");
    })
  }
}
