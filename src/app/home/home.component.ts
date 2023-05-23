import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  independentData: any = [];
  notIndependentData: any = [];
  allData: any = [];
  searchTerm: string = "";

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get<any>("https://restcountries.com/v3.1/independent?status=true&fields=name,flags,ccn3")
      .subscribe(data => {
        this.independentData = (data);

      });

    this.http.get<any>("https://restcountries.com/v3.1/independent?status=false&fields=name,flags,ccn3")
      .subscribe(data => {
        this.notIndependentData = (data);
        this.mergeData();

      });

  }

  mergeData() {
    this.allData = [...this.independentData, ...this.notIndependentData];
    console.log("merge : " + this.allData.length);
  }
  inputChanged() {
    if (this.searchTerm.length > 2)
      this.filter();
      else
      this.mergeData();
  }
  
  filter(){
    let searchArr:any=[];
    this.mergeData();
    this.allData.forEach(country => {
      if(JSON.stringify(country).toUpperCase().includes(this.searchTerm.toUpperCase()))
      {
        searchArr.push(country);
      }
      if(searchArr.length>0)
      this.allData=searchArr;
    });
  }
}
