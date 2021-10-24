import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

    fetchStudent(): Observable<Object>{
    return this.http.get('http://localhost:8000/api/v1/student');
    }





    deleteStudent(id): Observable<Object>{
      return this.http.delete('http://localhost:8000/api/v1/student/' +id);
    }



    createStudent(nam,rol): Observable<Object>{
      const newStudent = {
          name:nam,
          roll:rol
      };
      
      return this.http.post('http://localhost:8000/api/v1/student/' ,newStudent);
    }
  
    

   }

