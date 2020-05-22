import { Component, ViewChild } from '@angular/core';

import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('mylist')myList: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Pet adicionado!')
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
}
