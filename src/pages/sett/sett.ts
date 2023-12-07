import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the SettPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sett',
  templateUrl: 'sett.html',
})
export class SettPage1 {
  sett = {
    location: undefined,
    unit: undefined,
    statusToggle: undefined,
    name: undefined,
    country: undefined,

  };


  data: Observable<object>
  result: any;
  http: any;
  article: any;
  receivedData: any;
  news: string;




  constructor(public navCtrl: NavController, public navParams: NavParams, private st: Storage) {
    this.receivedData = this.navParams.get('data');
  }

  ionViewDidEnter(){
    this.sett.unit = "M";
    
  
  
    
  }



  //store the info in the Storage and pop the page on using the button (Save)
  setSettings(sett) {
     sett.name = sett.location;
    if(sett.statusToggle == true && sett.location2 == undefined) sett.statusToggle = false;
    
    //Store data from object
    this.st.set('dataStorage', { "loc": sett.location, "unit": sett.unit, "comp": sett.statusToggle, "name": sett.name, "country": sett.country});
    this.navCtrl.pop();
  }

 
  getData(name) {
    var url = "https://restcountries.com/v3.1/capital/"+ name;
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      //console.log(data);
      this.result = data;
    });
  }

  

}
