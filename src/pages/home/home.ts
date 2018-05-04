import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { OpenNativeSettings  } from '@ionic-native/open-native-settings';
import { Network } from '@ionic-native/network';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  wifiIPAddress: any;
  status: any;

  constructor(public navCtrl: NavController, public openNativeSettings: OpenNativeSettings,
                public networkInterface: NetworkInterface, public network: Network,
                public http: Http) {
                // watch network for a connection
                let connectSubscription = this.network.onConnect().subscribe(() => {
                  console.log('network connected!');
                  // We just got a connection but we need to wait briefly
                  // before we determine the connection type. Might need to wait.
                  // prior to doing any api requests as well.
                  setTimeout(() => {
                    if (this.network.type === 'wifi') {
                      alert('we got a wifi connection, woohoo!');
                      this.networkInterface.getWiFiIPAddress().then((ip)=>{
                        this.wifiIPAddress = ip;
                        alert(this.wifiIPAddress.ip);
                        this.getStatus(this.wifiIPAddress.ip);
                      });
                      
                    }
                  }, 3000);
                });
                
  }

  open(setting: string){
    this.openNativeSettings.open(setting).then(val => {
    
    }).catch(error =>{
      alert(JSON.stringify(error));
    })
  }

  getStatus(ip){
    this.http.get('http://172.31.31.1/getStatus').map(res => res.json()).subscribe(data => {
        this.status = data;
        alert(JSON.stringify(data));
    });
    
  }

  

}
