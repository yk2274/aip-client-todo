import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  constructor(private dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, { width:'500px' })
    dialogRef.afterClosed().subscribe()
  }
  
}
