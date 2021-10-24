import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasePathProviderService, Service} from '../../core/base-path-provider/base-path-provider.service';
import {Student} from '../../../domain/model/student';
import {InjectionTokens} from '../../injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly basePath: string;

  constructor(
    private http: HttpClient,
    @Inject(InjectionTokens.BASE_PATH_PROVIDER_SERVICE) private basePathProviderService: BasePathProviderService
  ) {
    this.basePath = basePathProviderService.provide(Service.STUDENT_SERVICE);
  }

  fetchStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.basePath}/api/v1/students`);
  }

  deleteStudent(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.basePath}/api/v1/students/` + id);
  }

  addStudent(name: string, roll: string): Observable<Student> {
    const newStudent = {name, roll};
    return this.http.post<Student>(`${this.basePath}/api/v1/students`, newStudent);
  }
}

