import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"pass-man-1ca5f","appId":"1:342537638250:web:b27feac583f90c819dd513","storageBucket":"pass-man-1ca5f.appspot.com","apiKey":"AIzaSyBWvb70uWG3wvHCzNl14l2QsWauAFHkiMU","authDomain":"pass-man-1ca5f.firebaseapp.com","messagingSenderId":"342537638250"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
