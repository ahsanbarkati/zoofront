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
    "access_token": "blank_token",
    "location": this.getCurrentLocation(),

  }

  var url = "http://0.0.0.0:11000/rout/request"
  
  this.getRequest(url,data)
 }

 getCurrentLocation(){
  var lat, lon;

  var geoSuccess = function(position) {
    // Log and store location
    console.log(position)
    lat = position.coords.latitude;
    lon = position.coords.longitude;
  };

  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        console.log('User is adamant on not sharing their location')
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  return {lat, lon}
};

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