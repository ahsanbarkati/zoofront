import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  success = false; // can be used to validate the form

  ngOnInit() {
  }

  constructor(private formBuilder: FormBuilder, private http:HttpClient) {
    this.registerForm = this.formBuilder.group({
      username: ['Ahsan'],
      email: ['ahsanb@iitk.ac.in'],
      password: ['password'],
      passwordConf: ['password'],
    });
   }

  registerUser(){
    this.submitted = true;
    console.log('Registration function called')

    const data = {
      'username': this.registerForm.controls.username.value,
      'email': this.registerForm.controls.email.value,
      'password': this.registerForm.controls.password.value,
      'passwordConf': this.registerForm.controls.passwordConf.value,
    };

    const url = 'http://0.0.0.0:11000/rout/register';
    this.postData(url, data);
  }

  postData(url,data) {

    this.http.post(url, data)
        .subscribe(
            (val) => {
                console.log('POST call successful value returned in body', val);
            },
            response => {
                console.log('POST call in error', response);
            },
            () => {
                console.log('The POST observable is now completed.');
            });
    }

}
