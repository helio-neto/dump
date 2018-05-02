import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private openNativeSettings: OpenNativeSettings) {

  }

  open(setting: string){
    this.openNativeSettings.open(setting).then(val => {
      
    }).catch(error =>{
      alert(JSON.stringify(error));
    })
  }

}
