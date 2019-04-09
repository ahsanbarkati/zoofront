import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css']
})
export class RequestRideComponent implements OnInit {

  ngOnInit() {
  }
rideForm: FormGroup;
submitted = false;
success = false;

constructor(private formBuilder: FormBuilder, private http:HttpClient) {
  this.rideForm = this.formBuilder.group({
    lat: 15.6,
    lon: 12.5
  })
 }

 requestRide(){
  this.submitted = true;
  console.log("Login function called")

  var data = {
    "email": this.rideForm.controls.lat.value,
    "password": this.rideForm.controls.lon.value,

  }

  var url = "http://0.0.0.0:11000/rout/request"
  
  this.getRequest(url,data)
 }

 getRequest(url,data) {

  this.http.get(url,data)
      .subscribe(
          (val) => {
              console.log("GET call successful value returned in body", val);
          },
          response => {
              console.log("GET call in error", response);
          },
          () => {
              console.log("The GET observable is now completed.");
          });
  }

}