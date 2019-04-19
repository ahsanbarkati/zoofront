import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient) {
   }

  
  profileData: any
  token =  sessionStorage.getItem('token');
  userID = sessionStorage.getItem('userID');
  
  ngOnInit() {
    
    var data = {
      "UserId": this.userID,
      "Token": this.token,
    }

    var url = "http://0.0.0.0:11000/rout/profile"
    
    this.postData(url,data);
  }

  postData(url,data) {

    this.http.post(url,data)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", val);
                this.profileData = val;
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }

}
