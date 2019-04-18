import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  queryForm: FormGroup;

  ngOnInit() {
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.queryForm = this.formBuilder.group({
      query: ['db.values.find()'],
    });

   }

   queryDB() {
     const data = {
       'query': this.queryForm.controls.query.value,
     };

     const url = 'http://0.0.0.0:11000/rout/query'
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
