import {Component, OnInit} from '@angular/core';
import {StudentService} from './services/domain/student-service/student.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Student} from './domain/model/student';
import {catchError, switchMap, tap} from 'rxjs/operators';

// import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  student$: Observable<Student[]>;
  user: Student = {
    name: '',
    roll: '',
  };

  private fetchStudents$ = new BehaviorSubject(this);

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.student$ = this.fetchStudents$.pipe(
      switchMap(() => this.studentService.fetchStudents())
    );
  }

  deleteStudent(id: number) {
    /*
    Complete this function to delete student and upon deletion of existing student based on the id of the student,
    It should prompt for a comfirmation for deletion and
    the updated list should be reflected in the UI
    */
    const confirmation = confirm(`Are you sure you want to delete Student(${id})`);

    if (confirmation) {
      this.withStateChangeTrigger(
        this.studentService.deleteStudent(id)
      );
    }
  }

  createStudent(name: string, roll: string) {
    /*
    Complete this function to create new student taking parameters as name and roll
    and upon addition of new student, he should be reflected in the UI
    */
    this.withStateChangeTrigger(
      this.studentService.addStudent(name, roll)
    );
  }

  private withStateChangeTrigger(observable: Observable<any>) {
    observable.pipe(
      catchError((e) => {
        alert(e && e.error && e.error.message || e.message || e);
        throw e;
      }),
      tap(() => this.fetchStudents$.next(this))
    ).subscribe();
  }
}



