import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'src/app/model/message.model';
import * as signalr from '@microsoft/signalr';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar'
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { User } from 'src/app/model/user.model';
import { Room } from 'src/app/model/room.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messages: Message[] = [];
  users: User[] = [];
  room !: number;
  
  messageControl = new FormControl('');
  userName! : string ;
  connection = new signalr.HubConnectionBuilder()
    .withUrl("https://localhost:7142/chat")
    .build();
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar){
    this.openDialogLoginUser();
  }

  ngOnInit(): void {

  }

  openDialogLoginUser(){
    const dialogRef =  this.dialog.open(UserDialogComponent,{
      width: '350px',
      data: this.userName,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userName = result;
      this.startConnection();
      this.openSnackBar(result);
    })
  }

  openSnackBar(username:string){
    const message = this.userName == username ? 'you joined' : `${username} joined to chat`
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  startConnection(){
    this.connection.on("newMessage", (userName: string, message: string, roomId: number)=>{
      console.log(roomId)
      this.messages.push({
        text: message,
        userName: userName,
        roomId : roomId,
      })
    })

    this.connection.on("previousUsers", (users: User[])=>{
      this.users = users;
    })

    this.connection.on("previousMessages", (messages: Message[])=>{
      this.messages = messages;
    })

    this.connection.on("previousRooms", (rooms: number)=>{
      this.room = rooms;
      
    })

    this.connection.on("newUser", (userName: string)=>{
      this.openSnackBar(userName);
    })

    this.connection.start()
    .then(() =>{
      this.connection.send("newUser", this.userName, this.connection.connectionId)
    })
  }

  sendMessage(){
    this.connection.send("newMessage", this.userName ,this.messageControl.value, this.room)
      .then(() => {
        this.messageControl.setValue('');

      })

  }

  verfyRoom(username: string){
    this.connection.send("verifyRoom", [username,this.userName],this.connection.connectionId )
  }

  logOut(){
    this.connection.stop();
    this.openDialogLoginUser();
  }

}
