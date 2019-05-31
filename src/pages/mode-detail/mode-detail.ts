import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-mode-detail',
  templateUrl: 'mode-detail.html',
})
export class ModeDetailPage {

  private register : FormGroup;
  Type:any;
  constructor(public navCtrl: NavController,
    public events: Events,public formBuilder: FormBuilder,public toastCtrl: ToastController, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      weight:['', Validators.required],
      Unit:['', Validators.required]
        });
  }

  logForm()
  {
    if(!this.Type)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Type of Mode',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    this.register.value.modetype = this.Type;
    this.register.value.weight = parseFloat((Number(this.register.value.weight)).toFixed(3));
    this.register.value.amount = Math.round(this.register.value.amount);
    if(this.navParams.data.type === 'advance')
    {
      if(this.navParams.data.item.id !='0')
      {
        this.register.value.action = 'edit';
        this.register.value.id = this.navParams.data.item.id;
        this.events.publish('advancemode',this.register.value);
        this.navCtrl.pop();
      }
      else{
        this.register.value.id = new Date().getTime();
        this.register.value.action = 'new';
        this.events.publish('advancemode',this.register.value);
        this.navCtrl.pop();
      }
    }
    else{
      if(this.navParams.data.item.id !='0')
      {
        this.register.value.action = 'edit';
        this.register.value.id = this.navParams.data.item.id;
        this.events.publish('mode',this.register.value);
        this.navCtrl.pop();
      }
      else{
        this.register.value.id = new Date().getTime();
        this.register.value.action = 'new';
        this.events.publish('mode',this.register.value);
        this.navCtrl.pop();
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage',this.navParams.data.type);
    if(this.navParams.data.item.id !='0')
    {
      this.register = this.formBuilder.group({
        name: [this.navParams.data.item.name, Validators.required],
        amount: [this.navParams.data.item.amount, Validators.required],
        weight:[this.navParams.data.item.weight, Validators.required],
        Unit:[this.navParams.data.Unit, Validators.required]
      });
      this.Type = this.navParams.data.item.modetype;
    }
  }

  }