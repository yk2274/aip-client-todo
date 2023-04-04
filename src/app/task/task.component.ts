import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { FormComponent } from '../form/form.component';
import { Task } from '../interface/task';
import { TaskService } from '../service/task.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = []
  completeTask: Map<number, boolean> = new Map([]);

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.loadTask()
  }

  loadTask() {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks
        tasks.forEach((task) => {
          this.completeTask.set(task.id, false);
        })
      })
  }

  checkedTask(taskId: number) {
    this.completeTask.set(taskId, !this.completeTask.get(taskId));
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(FormComponent, { 
      width: '500px' 
    })
    dialogRef.afterClosed().subscribe(() => this.loadTask())
  }

  openEditDialog(task: Task) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      data: task
    })
    dialogRef.afterClosed().subscribe(() => this.loadTask())
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(DeleteComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.taskService.deleteTask(task.id).subscribe(() => this.loadTask())
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
