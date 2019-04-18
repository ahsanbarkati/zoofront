import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  ngOnInit() {
  }

  loginForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['ahsanb@iitk.ac.in'],
      password: ['password'],
    })
   }

   loginUser(){
    this.submitted = true;
    console.log("Login function called")

    var data = {
      "email": this.loginForm.controls.email.value,
      "password": this.loginForm.controls.password.value,

    }

    var url = "http://0.0.0.0:11000/rout/login"
    
    this.postData(url,data)
   }

   postData(url,data) {

    this.http.post(url,data)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", val);
                if(val['Success'] == 'Success!') {
                  this.router.navigate(['/home']);
                  sessionStorage.setItem('token', val['Token']);
                  sessionStorage.setItem('userID', val['UserId']);
                }
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }

}
