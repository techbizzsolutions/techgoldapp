import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-advance-item-detail',
  templateUrl: 'advance-item-detail.html',
})
export class AdvanceItemDetailPage {

  private register : FormGroup;
  amount:any = 0;
  netweight:any = 0;
  constructor(public navCtrl: NavController,
    public events: Events,public formBuilder: FormBuilder,public toastCtrl: ToastController, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      Unit: ['', Validators.required],
      oldUnit: [''],
      Oldweight:[''],
      rate: ['', Validators.required]
        });
  }

  cal()
  {
     this.netweight =  this.register.value.weight - this.register.value.Oldweight;
     this.amount =  Math.round(this.netweight * this.register.value.rate);
  }

  logForm()
  {
    this.netweight =  this.register.value.weight - this.register.value.Oldweight;
    this.amount =  Math.round(this.netweight * this.register.value.rate);
    this.register.value.amount = this.amount;
    this.register.value.weight = parseFloat((Number(this.register.value.weight)).toFixed(3));
    this.register.value.Oldweight = parseFloat((Number(this.register.value.Oldweight)).toFixed(3));
    if(this.navParams.data.id)
    {
      this.register.value.action = 'edit';
      this.register.value.id = this.navParams.data.id;
      this.events.publish('advanceitem',this.register.value);
      this.navCtrl.pop();
    }
    else{
      this.register.value.id = new Date().getTime();
      this.register.value.action = 'new';
      this.events.publish('advanceitem',this.register.value);
      this.navCtrl.pop();
    }
   
  }

  ionViewDidLoad() {
    if(this.navParams.data.id)
    {
      this.register = this.formBuilder.group({
        name: [this.navParams.data.name, Validators.required],
        weight: [this.navParams.data.weight, Validators.required],
        Oldweight:[this.navParams.data.Oldweight],
        rate: [this.navParams.data.rate, Validators.required],
        Unit: [this.navParams.data.Unit, Validators.required],
        oldUnit: [this.navParams.data.oldUnit],
      });
          this.netweight = this.navParams.data.weight - this.navParams.data.Oldweight;
          this.amount = this.navParams.data.amount;
    }
  }

  }
