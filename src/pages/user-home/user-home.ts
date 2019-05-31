import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {
  Type:any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectBillTypePage');
  }

  next()
  {
    if(!this.Type)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Type of Sale',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    let members = JSON.parse(localStorage.getItem('user'));
    if(members && members.role === "Admin")
    {
      switch(this.Type)
      {
        case 'Gold':
        this.navCtrl.push('NormalBillPage',{type:this.Type});
        break;
        case 'Silver':
        this.navCtrl.push('NormalBillPage',{type:this.Type});
        break;
        case 'Stone':
        this.navCtrl.push('AdvanceBillPage',{type:this.Type});
        break;
        case 'Type 92.50':
        this.navCtrl.push('NormalBillPage',{type:this.Type});
        break;
        case 'Kale Money Less':
        this.navCtrl.push('AdvanceBillPage',{type:this.Type});
        break;
        default:
      }
    }
    else{
      let date = new Date();
      date.setDate(date.getDate());
      let From7 = date.toISOString().slice(0, 10);
      if(members && new Date(members.session).getTime() == new Date(From7).getTime())
      { 
        switch(this.Type)
        {
          case 'Gold':
          this.navCtrl.push('NormalBillPage',{type:this.Type});
          break;
          case 'Silver':
          this.navCtrl.push('NormalBillPage',{type:this.Type});
          break;
          case 'Stone':
          this.navCtrl.push('AdvanceBillPage',{type:this.Type});
          break;
          case 'Type 92.50':
          this.navCtrl.push('NormalBillPage',{type:this.Type});
          break;
          case 'Kale Money Less':
          this.navCtrl.push('AdvanceBillPage',{type:this.Type});
          break;
          default:
        }
      }
      else{
        let toast = this.toastCtrl.create({
          message: 'Session not started yet, Please connect to admin',
          position: 'top',
          duration: 3000
        });
        toast.present();
      }
    }
  }
}
