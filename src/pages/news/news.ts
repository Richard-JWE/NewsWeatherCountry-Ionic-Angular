import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  article: any = [];
  result: Observable<any>;
  data: Observable<object>;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams,private st: Storage) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewsPage');

  }

  ionViewDidEnter() {
    this.st.ready()
      .then(() => {
        //Get the data
        this.st.get('dataStorage')
          .then((data) => {
            if (data) {
              //API with the info in Storage
              this.news(data.country);
                  if(data.comp){           
                this.news(data.country);
              }
             
            }
          })
          //Catch Errors 
          .catch((err) => {
            console.log("Error trying to access storage: ")
            console.log(err);
          });
      })
      //Catch Errors
      .catch((err) => {
        console.log("Error trying to check Storage readiness: ")
        console.log(err);
      })
    

  }
      
          
  
    news(country: string) {
    this.article = [];
    var newsapi = "https://newsapi.org/v2/top-headlines?country=" + country + "&pageSize=100&apiKey=e47b4b614302401ab2d82fa9a7c65aa5";
    this.http.get(newsapi).subscribe((response) => {
      this.article = response['articles'];
      if (this.article.length === 0) {
        // No news stories found for the given country, display the message
        alert("error " + country + " not found")
        this.article.push({ title: `No news stories found for country with country code ${country}` });

      }
      return console.log(this.article);
      //console.log(response);
    },
        (error) => {
        console.error('Error getting country data:', error);
      }
    );
  }

}        

