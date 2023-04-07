import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { FormComponent } from '../dialog/form/form.component';
import { Task } from '../../../interface/task';
import { TaskService } from '../../../service/task.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = []
  completeTask: Map<number, boolean> = new Map([]);
  roles: String[] = this.authService.getRoles();
  
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService,
    public router: Router
  ) { }


  ngOnInit(): void {
    this.loadTask()
  }

  loadTask(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks
        tasks.forEach((task) => {
          this.completeTask.set(task.id, false);
        })
      })
  }

  checkedTask(taskId: number): void {
    this.completeTask.set(taskId, !this.completeTask.get(taskId));
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, { 
      width: '500px' 
    })
    dialogRef.afterClosed().subscribe(() => this.loadTask())
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      data: task
    })
    dialogRef.afterClosed().subscribe(() => this.loadTask())
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(DeleteComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.taskService.deleteTask(task.id).subscribe(() => this.loadTask())
      }
    })
  }

  hasAdminRole(): boolean {    
    return this.roles.indexOf("ROLE_ADMIN") !== -1 
  }

  navigateToDashboard(): void {
    this.router.navigate(['/admin'])
  }

  logout(): void {
    this.authService.logout();
  }
}
