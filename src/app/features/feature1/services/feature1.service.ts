import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Model1 } from '../store/feature1.reducer';

@Injectable({
  providedIn: 'root'
})
export class Feature1Service {

  constructor() {
  }

  getModel1(): Observable<Model1[]> {
    return of(
      [
        {
          cap: 121654,
          cognome: 'Testamelo',
          nome: 'Test',
          indirizzo: 'un indirizzo random'
        },
        {
          cap: 121654,
          cognome: 'Testamelo1',
          nome: 'Test1',
          indirizzo: 'un indirizzo random'
        },
        {
          cap: 121654,
          cognome: 'Testamelo2',
          nome: 'Test2',
          indirizzo: 'un indirizzo random'
        },
      ]
    )
  }
}
