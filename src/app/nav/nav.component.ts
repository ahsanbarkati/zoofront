import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  
  token =  sessionStorage.getItem('token');
  logged = sessionStorage.getItem('token') != null;

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    
  }
  
  
  logoutUser(){
    console.log('logged out');
    this.logged = false;
    const url = 'http://0.0.0.0:11000/rout/logout';
    const data= {
      'userId': sessionStorage.getItem('userID'),
    }
    this.getRequest(url,data)
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('userID', null);
  }

  getRequest(url,data) {
    console.log('sending ', data);
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
