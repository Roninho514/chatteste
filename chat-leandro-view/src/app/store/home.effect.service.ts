import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { IHomeState } from './home.app.state';
import { Store } from '@ngrx/store';
import * as signalr from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class HomeEffectService {

  constructor(
    private http: HttpClient,
    private store : Store<{app: IHomeState}>) { }

    connection = new signalr.HubConnectionBuilder()
    .withUrl("https://localhost:7142/chat")
    .build();
}
