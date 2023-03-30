import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { FormComponent } from '../form/form.component';
import { Task } from '../interface/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  //get this data to database data
  tasks: Task[] = []

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadTask()
    this.dialog.afterAllClosed.subscribe(() => this.loadTask())  
  }

  loadTask() {
    this.taskService.getTasks()
    .subscribe(tasks => {
      this.tasks = tasks
    })
  }

  openEditDialog(task: Task) {
    const dialogRef = this.dialog.open(FormComponent, { 
      width:'500px',
      data: task
    })
    dialogRef.afterClosed().subscribe()
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(DeleteComponent)
    dialogRef.afterClosed().subscribe(result => {           
      if (result == true) {
        console.log(result);
      }
    })
  }
}
