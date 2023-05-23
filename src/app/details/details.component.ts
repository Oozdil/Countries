import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 code:string;
 data:any;

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {
  }
  ngOnInit() {
    let url = this.activeRoute.snapshot.url;

    this.code = this.activeRoute.snapshot.url[1].path;
    console.log(this.code);

    this.http.get<any>("https://restcountries.com/v3.1/all")
      .subscribe(data => {
        data.forEach(d => {
          if(d.ccn3==this.code){
            this.data = d;
            console.log(JSON.stringify(d));
          }
        });
      },err=>{
        console.log(err);
      });
  }
  extractData() {
    
  }

}
