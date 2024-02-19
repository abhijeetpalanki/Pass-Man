import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {
  firestore = inject(Firestore);

  addSite(data: object) {
    const dbInstance = collection(this.firestore, "sites");
    return addDoc(dbInstance, data);
  }

  getAllSites() {
    const dbInstance = collection(this.firestore, "sites");
    return collectionData(dbInstance, { idField: "id" });
  }
}
