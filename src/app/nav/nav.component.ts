import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  
  token =  sessionStorage.getItem('token');
  logged = sessionStorage.getItem('token').length > 0;

  constructor() { 
  }
  ngOnInit() {
    
  }
  
  
  logoutUser(){
    console.log('logged out');
    sessionStorage.setItem('token','');
    this.logged = false;
    window.location.reload();
  }

}
