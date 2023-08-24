import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA, MatDialogRef} from  '@angular/material/dialog'

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public username: string,
    public dialogRef: MatDialogRef<UserDialogComponent>
  ){}

  ngOnInit(): void {

  }
}
