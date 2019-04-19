import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css']
})
export class RequestRideComponent implements OnInit {

  lat = 0;
  lon = 0;

  logged = sessionStorage.getItem('token').length > 0;

  ngOnInit() {
  }

  constructor(private http:HttpClient) {
  }

  requestRide() {

    var data = {
      'token': 'blank_token',
      'lat': 'blank',
      'lon': 'blank',
      'userId': sessionStorage.getItem('userID'),
    }

    this.getCurrentLocation();

    const url = 'http://0.0.0.0:11000/rout/request';
    setTimeout(() => this.postRequest(url, data), 2000);
  }

  postRequest(url,data) {
  	data.token = sessionStorage.getItem('token');
    data.lat = this.lat;
    data.lon = this.lon;
    console.log('sending ', data);
    this.http.post(url,data)
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

  getCurrentLocation(){
    var lati, long;
  
    var geoSuccess = function(position) {
      // Log and store location
      console.log(position)
      lati = position.coords.latitude;
      long = position.coords.longitude;
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
    setTimeout(() => this.waiter(lati, long), 500);
  };
  
  waiter(lati, long){
    this.lat = lati;
    this.lon = long;
    console.log('Waited')
  }

}
