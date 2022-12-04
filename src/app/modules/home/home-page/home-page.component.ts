import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formFile: FormGroup = new FormGroup({});
  private lastEventFile:any;
  data:Array<Array<string>> = [];
  fileChanged(e: any) {
    this.lastEventFile = e;
    this.data = [];
    let file = this.lastEventFile.target.files[0];
    let fileReader:FileReader = new FileReader;
    // let data = this.data;
    fileReader.onload = () => {
      let dataRow = (""+fileReader.result).replaceAll('\r\n', '\n').split('\n');
      dataRow.forEach((dataTmp) =>{
        this.data.push(dataTmp.split(','));
      })
    }
    console.log("Data ->",this.data);
    fileReader.readAsText(file);
  }
  submit(){

  }

  getHeaders(){
    return this.data?this.data[0]:undefined;
  }

  getData(){
    let dataWhitoutHeaders = [...this.data];
    dataWhitoutHeaders.shift();
    return dataWhitoutHeaders;
  }
}
