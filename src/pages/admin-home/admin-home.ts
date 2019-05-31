import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { AdvanceFilterPage } from '../advance-filter/advance-filter';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {
  weight:number = 0 ;
  goldweight:number = 0 ;
  silverweight:number = 0 ;
  otherweight:number = 0 ;
  saleAmount:number = 0;
  saleWeight:number = 0;
  modeamount:number = 0;
  totalModeWeight:number = 0;
  bill=[];
  Bills = [];
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dateTimeProvider:DateTimeProvider,
    public navParams: NavParams) {
      this.Bills = JSON.parse(localStorage.getItem('Bills'));
  }

  refresh()
  {
    this.Bills = JSON.parse(localStorage.getItem('Bills'));
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {   
    if(this.Bills)
    {
      this.bill = this.Bills;
      this.saleAmount = 0;
      this.saleWeight = 0;
      this.modeamount = 0;
      this.weight = 0;
      this.goldweight = 0;
      this.silverweight = 0;
      this.otherweight = 0;
      this.totalModeWeight = 0;
      this.bill.forEach(element => {
        this.saleAmount = this.saleAmount + Number(element.saleamount);
        this.saleWeight = parseFloat((Number(this.saleWeight + Number(element.totalSaleWeight))).toFixed(3));
        this.modeamount = this.modeamount + Number(element.totalModemamount);
        this.totalModeWeight = parseFloat((Number(this.totalModeWeight + Number(element.totalModeWeight))).toFixed(3)); 
      });
    }
  }

  edit(item:any,slidingItem: ItemSliding)
  {
     console.log('item ',item.type);
     slidingItem.close();
     if(item.type === 'Stone' || item.type === 'Kale Money Less')
     {
      this.navCtrl.push('AdvanceBillPage',item);
     }
     else{
      this.navCtrl.push('NormalBillPage',item);
     }
  }

  delete(item:any,slidingItem: ItemSliding)
  {
      let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to print the bill?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            slidingItem.close();
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            // get index of object with id:37
              var removeIndex = this.bill.map(function(item) { return item.Bill; }).indexOf(item.Bill);
              // remove object
              this.bill.splice(removeIndex, 1);
              localStorage.setItem('Bills', JSON.stringify(this.bill));
              this.refresh();
          }
        }
      ]
    });
    confirmAlert.present();
  }

  itemclick(item:any)
  {
    console.log('item ',item);
    this.navCtrl.push('BillDetailPage',item);
  }

  getTotalModeWeight(modes)
  {
    modes.forEach(element => {
       switch (element.modetype) {
         case 'Gold':
          this.goldweight = parseFloat((Number(this.goldweight + Number(element.weight))).toFixed(3));
           break;
        case 'Silver':
          this.silverweight = parseFloat((Number(this.silverweight + Number(element.weight))).toFixed(3));
           break;
         default:
          this.otherweight = parseFloat((Number(this.otherweight + Number(element.weight))).toFixed(3));
           break;
       }
    });
  }
  presentDatePopover() {
    let myModal = this.modalCtrl.create(AdvanceFilterPage);
    myModal.onDidDismiss((data) => {
      if (data) {
        console.log(data);
        if(this.Bills)
        {
          this.bill = [];
          this.weight = 0;
          this.goldweight = 0;
          this.silverweight = 0;
          this.otherweight = 0;
          this.saleAmount = 0;
          this.saleWeight = 0;
          this.modeamount = 0;
          this.totalModeWeight = 0;
          for (let index = 0; index < this.Bills.length; index++) {
            if(this.Bills[index].type === data.type && data.From === "From" && data.To === "To")
            {
                console.log('item 1');
                this.saleAmount = this.saleAmount + Number(this.Bills[index].saleamount);
                this.saleWeight = parseFloat((Number(this.saleWeight + Number(this.Bills[index].totalSaleWeight))).toFixed(3));
                this.modeamount = this.modeamount + Number(this.Bills[index].totalModemamount);
                this.totalModeWeight = parseFloat((Number(this.totalModeWeight + Number(this.Bills[index].totalModeWeight))).toFixed(3));
                this.Bills[index].items.forEach(element => {
                  this.weight = this.weight + Number(element.weight);
                });
                this.getTotalModeWeight(this.Bills[index].modes);
                this.bill.push(this.Bills[index]);
            }
            else if(data.type ==="none")
            {
              if(new Date(this.getCorrectDate(data.From)) <= new Date(this.getCorrectDate(this.Bills[index].date)) && (new Date(this.getCorrectDate(data.To)) >= new Date(this.getCorrectDate(this.Bills[index].date))))
              {
                console.log('item 2');
                this.bill.push(this.Bills[index]);
                this.saleAmount = this.saleAmount + Number(this.Bills[index].saleamount);
                this.saleWeight = parseFloat((Number(this.saleWeight + Number(this.Bills[index].totalSaleWeight))).toFixed(3));
                this.modeamount = this.modeamount + Number(this.Bills[index].totalModemamount);
                this.totalModeWeight = parseFloat((Number(this.totalModeWeight + Number(this.Bills[index].totalModeWeight))).toFixed(3));
              }
            }
            else{
              if(data.type === this.Bills[index].type && new Date(this.getCorrectDate(data.From)) <= new Date(this.getCorrectDate(this.Bills[index].date)) && new Date(this.getCorrectDate(data.To)) >= new Date(this.getCorrectDate(this.Bills[index].date)))
              {
                console.log('item 3');
                this.saleAmount = this.saleAmount + Number(this.Bills[index].saleamount);
                this.saleWeight = parseFloat((Number(this.saleWeight + Number(this.Bills[index].totalSaleWeight))).toFixed(3));
                this.modeamount = this.modeamount + Number(this.Bills[index].totalModemamount);
                this.totalModeWeight = parseFloat((Number(this.totalModeWeight + Number(this.Bills[index].totalModeWeight))).toFixed(3));
                this.Bills[index].items.forEach(element => {
                  this.weight = this.weight + Number(element.weight);
                });
                this.getTotalModeWeight(this.Bills[index].modes);
                this.bill.push(this.Bills[index]);
              }
            }
          }
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'Please add at least one bill',
            position: 'top',
            duration: 3000
          });
          toast.present();
        }
      }
    });
    myModal.present();
  }

  getCorrectDate(date)
  {
    var chunks = date.split('-');
    return chunks[1]+'-'+chunks[0]+'-'+chunks[2];
  }
}

