import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Task, TaskRequest } from '../interface/task';

@Injectable({providedIn: 'root'})
export class TaskService {
  private readonly api = 'http://localhost:8080/api/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api).pipe(
      tap(tasks => console.log(tasks)),
      catchError(this.handleError)
    )
  }

  addTask(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(this.api, task, this.httpOptions).pipe(
      tap((newTask: Task) => console.log(newTask)),
      catchError(this.handleError)
    );
  }

  updateTask(task: TaskRequest, taskId: number): Observable<Task> {
    return this.http.put<Task>(`${this.api}?taskId=${taskId}`, task, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
   
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error status: ${error.status}, Error message: ${error.message}`))
  }
}
