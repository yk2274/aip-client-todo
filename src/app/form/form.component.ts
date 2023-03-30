import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskRequest } from '../interface/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TaskService
  ) { }

  formData = new FormGroup({
    title: new FormControl(this.task?.title, [Validators.required]),

    category: new FormControl(this.task?.category, [Validators.required]),

    dueDate: new FormControl(this.task?.dueDate, [Validators.required]),

    description: new FormControl(this.task?.description),
  })

  ngOnInit(): void {
    this.formData.valueChanges.subscribe((value) => console.log(value))
  }
  getErrorMessage() {
    return 'You must enter a value';
  }

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
