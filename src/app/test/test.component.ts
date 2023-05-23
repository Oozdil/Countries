import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  data: any;
  countries:any=[];

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get("https://restcountries.com/v3.1/all").subscribe((data) => {
      this.data = data;
      this.data.forEach(country => {
        this.countries.push(country);
      });
    });
  }
}
