import { Component, ViewChild } from '@angular/core';

import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList} from '@ionic/angular';

import _ from 'lodash';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: Item[] = [];

  newItem: Item = <Item>{};

  queryText: string;

  @ViewChild('mylist')myList: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });

    this.queryText = '';
  }

  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Item added!')
      this.loadItems();
    });
  }

  loadItems(){
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

      this.myList.closeSlidingItems();
      this.loadItems();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 200);
  }

  filterItem(item: any){
    let val = item.target.value;

    if (val && val.trim() != ''){
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.myList.closeSlidingItems();
      this.loadItems();
    }
  }

}
