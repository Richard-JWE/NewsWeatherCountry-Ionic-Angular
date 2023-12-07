import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { GetWeatherProvider } from '../../providers/get-weather/get-weather';
import { SettPage1 } from '../sett/sett';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { NewsPage } from '../news/news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  private locationsArray: Array<object> = [];
  
  result: any = [];
  data: Observable<object>;
  weatherSymbol: string;
  newsCountry: any;
  response: Observable<object>;
  cityNotFound: boolean;
  news: Array<object> = [];




  constructor(public http: HttpClient, public navCtrl: NavController, private gw: GetWeatherProvider, private st: Storage) {
    
  }

 //delete any stored value in Storage
  ionViewDidLoad(){
    this.st.clear();
    
  }

  /* Method to Push the Settings Page */
  goSettings(){
    this.navCtrl.push(SettPage1);
  }
    goHome(){
    this.navCtrl.push(HomePage);
    }
   goNews(){
    this.navCtrl.push(NewsPage);
  }

  //On Change get the Weather Data
  ionViewDidEnter(){
    //Reset basic variables
    this.locationsArray = [];
    //Wait until the storage is ready
    this.st.ready()
      .then(() => {
        //Get the data
        this.st.get('dataStorage')
          //On success 
          .then((data) => {
            //If there's data (not first load)
            if(data){
              //Get to the API with the info in Storage
              this.getWeather(data.loc, data.unit);
              this.getCountry(data.name);
           
              if(data.comp){
                this.getWeather(data.loc, data.unit);
                this.getCountry(data.name);
                
              }
          
              this.weatherSymbol = this.getWeatherSymbol(data.unit);
            }
          })
          //Catch Errors on Accessing Storage
          .catch((err) => {
            console.log("Error trying to access storage: ")
            console.log(err);
          });
      })
      //Catch Errors on Checking if Storage Ready
      .catch((err) => {
        console.log("Error trying to check Storage readiness: ")
        console.log(err);
      })
    

  }



  //Method to access the weather API 
  getWeather(location: string, unit: string){
    this.gw.getWeather(location, unit).subscribe(
      //On success Accessing the API
      (dataWeather) => {
        //Object stores the information needed
        let data: object = {
          location: dataWeather.data[0].city_name,
          weather: dataWeather.data[0].app_temp,
          description: dataWeather.data[0].weather.description,
          cityName: dataWeather.data[0].country_code,
          country: dataWeather.data[0].country_code,
   
          
        };
    
        this.locationsArray.push(data);

      },
    );
  }



  //Method to select the correct Unit Symbol for Display
  getWeatherSymbol(unit: string): string{
    switch (unit) {
      //Celsius Symbol: &#8451;
      case "M":
        return "&#8451;";
      //Kelvin Symbol: &#8490;
      case "S":
        return "&#8490;";
      //Farenheit Symbol: &#8457;
      case "I":
        return "&#8457;";
      default:
        return "";
    }
  }
  



  getCountry(name) {
    var url = "https://restcountries.com/v3.1/capital/"+name;
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      //console.log(data);
      this.result = data;
      this.cityNotFound = false; 
        return of(false);
    },
       (error) => {
         console.error('Undefined/Not Found:', error);
         this.cityNotFound = true; 
         this.cityNotFound = name;
        return of(true);
      }
    );
  }

  

  }
// https://api.thenewsapi.com/v1/news/all?api_token=InGLViamYYxe4xEji37KzRcJQd2ikAdI8j6I2YIv&search="gb





