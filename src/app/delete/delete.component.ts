import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>) { }

  onClick() {
    this.dialogRef.close(true)    
  }
}
