import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskRequest } from '../../../../interface/task';
import { TaskService } from '../../../../service/task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TaskService
  ) { }

  formData = new FormGroup({
    title: new FormControl(this.task?.title, [Validators.required, Validators.maxLength(250)]),

    category: new FormControl(this.task?.category, [Validators.required, Validators.maxLength(2000)]),

    dueDate: new FormControl(this.task?.dueDate, [Validators.required]),

    description: new FormControl(this.task?.description, Validators.maxLength(2000)),
  })

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.task?.id != null) {
      this.taskService
        .updateTask(this.formData.value as TaskRequest, this.task.id)
        .subscribe()
      this.dialogRef.close()
    } else {
      this.taskService
        .addTask({
          ...this.formData.value as TaskRequest,
          dueDate: (this.formData.controls.dueDate.value as any).format("YYYY-MM-DD")
        })
        .subscribe()
      this.dialogRef.close()
    }
  }
}

