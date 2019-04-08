import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }

  registerForm: FormGroup;
  submitted = false;
  success = false; // can be used to validate the form

  constructor(private formBuilder: FormBuilder, private http:HttpClient) {
    this.registerForm = this.formBuilder.group({
      name: ['Ahsan'],
      email: ['ahsanb@iitk.ac.in'],
      password: ['password'],
      confirmPassword: ['password'],
    })
   }

  registerUser(){
    this.submitted = true;
    console.log("Registration function called")
    var data = {
      "name": this.registerForm.controls.name.value,
      "email": this.registerForm.controls.email.value,
      "password": this.registerForm.controls.password.value,
      "confirmPassword": this.registerForm.controls.confirmPassword.value
    }
    var url = "http:localhost:11000/rout/register"
    this.postData(url,data)
  }

  postData(url,data) {

    this.http.post(url,data)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", 
                            val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }
  

}
