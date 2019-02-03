import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  events = [
      {eventId: 1, eventName: "Kids Party", eventPrice: "220", discountId: null},
      {eventId: 2, eventName: "Wine Tour", eventPrice: "440", discountId: 3},
      {eventId: 3, eventName: "Team Building", eventPrice: "800", discountId: 2},
      {eventId: 4, eventName: "Picnic", eventPrice: "110", discountId:4},
  ];
  discounts = {};
  qty:number;
  totalAmount:number;
  freeItem:number;

  constructor() {
    this.discounts['1']={no_of_items: 5, disPercent: 20, onNextPurchase: false, total_amount:null, pay_for_only:null, no_free_item:null};
    this.discounts['2']={no_of_items: 2, disPercent: null, onNextPurchase: false, total_amount:1500, pay_for_only:null, no_free_item:null};
    this.discounts['3']={no_of_items: 4, disPercent: null, onNextPurchase: false, total_amount:null, pay_for_only:3, no_free_item:null};
    this.discounts['4']={no_of_items: 2, disPercent: null, onNextPurchase: false, total_amount:null, pay_for_only:null, no_free_item:1};
    this.freeItem=0;
  }

  calculateDiscount(){
    if(Number(this.qty) === 5){
        this.totalAmount =(Number(this.selectedEvent.eventPrice) * 4) + (Number(this.selectedEvent.eventPrice) - (Number(this.selectedEvent.eventPrice) * 0.2));
        console.log(this.totalAmount);
    }
    else{
      if(this.selectedEvent.discountId){
          var disountType = this.discounts[this.selectedEvent.discountId] ? this.discounts[this.selectedEvent.discountId] : null;
          if(disountType !== 'undefined'){
              if(Number(this.qty) === disountType['no_of_items']){
                if(disountType['total_amount']){
                  this.totalAmount = 1500;
                }
                else if(disountType['pay_for_only']){
                    this.totalAmount = Number(this.selectedEvent.eventPrice) * disountType['pay_for_only'];
                }
                else if(disountType['no_free_item']){
                    this.totalAmount = Number(this.selectedEvent.eventPrice) * disountType['no_of_items'];
                    this.freeItem = disountType['no_free_item'];
                }
                else{
                    this.totalAmount = Number(this.selectedEvent.eventPrice) * Number(this.qty);
                }
              }
              else{
                  this.totalAmount = Number(this.selectedEvent.eventPrice) * Number(this.qty);
              }
          }
          else{
              this.totalAmount = Number(this.selectedEvent.eventPrice) * Number(this.qty);
          }
      }
      else{
          this.totalAmount = Number(this.selectedEvent.eventPrice) * Number(this.qty);
      }
    }
  }

  selectedEvent = this.events[0];
}
