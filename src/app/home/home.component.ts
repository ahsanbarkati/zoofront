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
  history:any
  keys:any
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
                this.profileData['wallet'] = this.profileData['wallet'].toFixed(2);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }

    getHistory(){
      const data = {
        'query': "db.rides.find({UserID:"+this.userID+"})",
      };
      console.log("Getting history: ", data)
      const url = 'http://0.0.0.0:11000/rout/admin';
      this.http.post(url,data)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", val);
                this.history = val['result'];
                this.keys = val['keys']
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }

}
