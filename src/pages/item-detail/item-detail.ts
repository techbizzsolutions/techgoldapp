import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  private register : FormGroup;
  amount:any = 0;
  constructor(public navCtrl: NavController,
    public events: Events,public formBuilder: FormBuilder,public toastCtrl: ToastController, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      Unit:['', Validators.required],
      rate: ['', Validators.required]
      });
  }

  cal()
  {
     this.amount =  Math.round(this.register.value.weight * this.register.value.rate);
  }

  logForm()
  {
    this.register.value.amount = Math.round(this.register.value.weight * this.register.value.rate);
    this.register.value.weight = parseFloat((Number(this.register.value.weight)).toFixed(3));
    if(this.navParams.data.id)
    {
      this.register.value.action = 'edit';
      this.register.value.id = this.navParams.data.id;
      this.events.publish('item',this.register.value);
      this.navCtrl.pop();
    }
    else{
      this.register.value.id = new Date().getTime();
      this.register.value.action = 'new';
      this.events.publish('item',this.register.value);
      this.navCtrl.pop();
    }
   
  }

  ionViewDidLoad() {
    if(this.navParams.data.id)
    {
      this.register = this.formBuilder.group({
        name: [this.navParams.data.name, Validators.required],
        weight: [this.navParams.data.weight, Validators.required],
        Unit:[this.navParams.data.Unit, Validators.required],
        rate: [this.navParams.data.rate, Validators.required],
        });
      this.amount = this.navParams.data.amount;
    }
  }

  }
