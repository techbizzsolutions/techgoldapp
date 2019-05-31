import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeProvider } from '../../providers/date-time/date-time';

@IonicPage()
@Component({
  selector: 'page-advance-bill',
  templateUrl: 'advance-bill.html',
})
export class AdvanceBillPage {
  private register : FormGroup;
  date:any = 'Date';
  items =[];
  modes = [];
  totalamount:number = 0;
  totalItemamount:number = 0;
  totalModemamount:number = 0;
  totalnetamount:number = 0;
  totalModeWeight:number = 0;
  totalSaleWeight:number = 0;
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public events: Events,
    public alertCtrl: AlertController,
    public dateTimeProvider:DateTimeProvider,
    public formBuilder: FormBuilder,public navParams: NavParams) {
    this.register = this.formBuilder.group({
      Bill:['', Validators.required],
      Name:['', Validators.required],
      Address:['', Validators.required],
      discount:[0],
      labourcharge:[0],
      Mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });

    events.subscribe('advanceitem', (item) => {
      console.log('item',item);
      if(item.action === "edit")
      {
         for (let index = 0; index <  this.items.length; index++) {
            if(item.id == this.items[index].id)
            {
              this.items[index].name = item.name;
              this.items[index].weight = item.weight;
              this.items[index].Oldweight = item.Oldweight;
              this.items[index].rate = item.rate;
              this.items[index].Unit = item.Unit;
              this.items[index].oldUnit = item.oldUnit;
              this.items[index].amount = item.amount;
              break;
            }
         }
      }
      else{
        this.items.push(item);
      }

      this.totalamount = 0;
      this.totalItemamount = 0;
      this.totalModemamount = 0;
      this.totalSaleWeight = 0;
      for (let index = 0; index < this.items.length; index++) {
         this.totalItemamount = this.totalItemamount + Number(this.items[index].amount);
         this.totalSaleWeight = this.totalSaleWeight + Number(this.items[index].weight);
      }
      for (let index = 0; index < this.modes.length; index++) {
        this.totalModemamount = this.totalModemamount + Number(this.modes[index].amount);
      }
      this.totalamount = this.totalItemamount - this.totalModemamount;
    });

    events.subscribe('advancemode', (item) => {
      console.log('advancemode',item);
      if(item.action === "edit")
      {
         for (let index = 0; index <  this.modes.length; index++) {
            if(item.id == this.modes[index].id)
            {
              this.modes[index].name = item.name;
              this.modes[index].amount = item.amount;
              this.modes[index].weight = item.weight;
              this.modes[index].Unit = item.Unit;
              this.modes[index].modetype = item.modetype;
              break;
            }
         }
      }
      else{
        this.modes.push(item);
      }
      this.totalamount = 0;
      this.totalItemamount = 0;
      this.totalModemamount = 0;
    for (let index = 0; index < this.items.length; index++) {
        this.totalItemamount = this.totalItemamount + Number(this.items[index].amount);
     }
     for (let index = 0; index < this.modes.length; index++) {
       this.totalModemamount = this.totalModemamount + Number(this.modes[index].amount);
       this.totalModeWeight = this.totalModeWeight + Number(this.modes[index].weight);
     }
     this.totalamount = this.totalItemamount - this.totalModemamount;

    });
  }

  opencal()
  {
      this.dateTimeProvider.opencal().then(res =>{
          this.date =  res;
     })
     .catch(err=>{
      var date = new Date();
      var res =  date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
      this.date  =  res;
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvanceBillPage',this.navParams.data);
    if(this.navParams.data.Bill)
    {
      this.register = this.formBuilder.group({
        Bill:[this.navParams.data.Bill, Validators.required],
        Name:[this.navParams.data.Name, Validators.required],
        Address:[this.navParams.data.Address, Validators.required],
        discount:[this.navParams.data.discount],
        labourcharge:[this.navParams.data.labourcharge],
        Mobile : [this.navParams.data.Mobile,Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
      this.items = this.navParams.data.items;
      this.modes = this.navParams.data.modes;
      this.date = this.navParams.data.date;
      this.totalamount = this.navParams.data.totalamount;
      this.totalItemamount = this.navParams.data.totalItemamount;
      this.totalModemamount = this.navParams.data.totalModemamount;
      this.totalModeWeight = this.navParams.data.totalModeWeight;
      this.totalSaleWeight = this.navParams.data.totalSaleWeight;
    }
  }

  modeitemclick(item:any)
  {
    this.navCtrl.push('ModeDetailPage',{item:item,type:'advance'});

  }
  itemclick(item:any) {
    this.navCtrl.push('AdvanceItemDetailPage',item);
  }

  cal()
  {
    this.totalnetamount = this.totalItemamount - this.totalModemamount + Number(this.register.value.labourcharge) - Number(this.register.value.discount);
  }

  deletemode(modeitem)
  {
    console.log(modeitem);
    let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to delete mode?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            var removeIndex = this.modes.map(function(item) { return item.id; }).indexOf(modeitem.id);
            this.modes.splice(removeIndex, 1);
            this.totalamount = 0;
            this.totalModemamount = 0;
            for (let index = 0; index < this.modes.length; index++) {
              this.totalModemamount = this.totalModemamount + Number(this.modes[index].amount);
            }
            this.totalamount = this.totalItemamount - this.totalModemamount;
          }
        }
      ]
    });
    confirmAlert.present();
  }

  delete(billitem)
  {
    console.log(billitem);
    let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to delete item?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            var removeIndex = this.items.map(function(item) { return item.id; }).indexOf(billitem.id);
            this.items.splice(removeIndex, 1);
            this.totalamount = 0;
            this.totalItemamount = 0;
            for (let index = 0; index < this.items.length; index++) {
              this.totalItemamount = this.totalItemamount + Number(this.items[index].amount);
            }
            this.totalamount = this.totalItemamount - this.totalModemamount;
          }
        }
      ]
    });
    confirmAlert.present();
    
  }

  logForm()
  {
    if(this.date === "Date")
    {  
        let toast = this.toastCtrl.create({
        message: 'Please select Date',
        position: 'top',
        duration: 3000
      });
      toast.present();
       return;
    }
    if(!this.items.length)
    {  
        let toast = this.toastCtrl.create({
        message: 'Please add item',
        position: 'top',
        duration: 3000
      });
      toast.present();
       return;
    }
    let Bills = JSON.parse(localStorage.getItem('Bills'));
    let user = JSON.parse(localStorage.getItem('user'));
    this.register.value.type = this.navParams.data.type;
    this.register.value.date = this.date;
    this.register.value.items = this.items;
    this.register.value.createdBy = (user.name) ? user.name : 'Admin';
    this.register.value.modes = this.modes;
    this.register.value.totalamount = this.totalamount;
    this.register.value.totalItemamount = this.totalItemamount;
    this.register.value.totalModemamount = this.totalModemamount;
    this.register.value.totalModeWeight = parseFloat((Number(this.totalModeWeight)).toFixed(3));
    this.register.value.totalSaleWeight = parseFloat((Number(this.totalSaleWeight)).toFixed(3));
    this.register.value.saleamount = this.totalItemamount - this.totalModemamount + Number(this.register.value.labourcharge) - Number(this.register.value.discount);

    if(Bills)
    {
      if(this.navParams.data.Bill)
      {
        var removeIndex = Bills.map(function(item) { return item.Bill; }).indexOf(this.navParams.data.Bill);
        // remove object
        Bills.splice(removeIndex, 1);
        Bills.push(this.register.value);
        localStorage.setItem('Bills', JSON.stringify(Bills));
      }
      else{
        for (let index = 0; index < Bills.length; index++) {
          if(Bills[index].Bill == this.register.value.Bill)
          {
            let toast = this.toastCtrl.create({
              message: 'This bill number already exits, please enter different bill number',
              position: 'top',
              duration: 3000
            });
            toast.present();
             return;
          }
          
        }
        Bills.push(this.register.value);
        localStorage.setItem('Bills', JSON.stringify(Bills));
      }
      
    }
    else{
      let data = [];
      data.push(this.register.value);
      localStorage.setItem('Bills', JSON.stringify(data));
    }
    let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to print the bill?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            this.navCtrl.pop();
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.navCtrl.pop();
            this.navCtrl.push('BillDetailPage',this.register.value);
          }
        }
      ]
    });
    confirmAlert.present();
  }

}
