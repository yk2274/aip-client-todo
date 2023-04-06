import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './component/login/login.component';
import { DeleteComponent } from './component/dialog/delete/delete.component';
import { FormComponent } from './component/dialog/form/form.component';
import { TaskComponent } from './component/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    LoginComponent,
    TaskComponent,
    DeleteComponent,
    FormComponent
   ],

  exports: [
    LoginComponent,
    TaskComponent,
    DeleteComponent,
    FormComponent
  ],

  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MatDesignModule { }
