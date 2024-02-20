import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

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

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, "sites", id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, "sites", id);
    return deleteDoc(docInstance);
  }

  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  getAllPasswords(siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: "id" });
  }

  updatePassword(siteId: string, passwordId: string, data: object) {
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId: string, passwordId: string) {
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);
  }
}
