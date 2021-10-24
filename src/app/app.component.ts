import {Component, OnInit} from '@angular/core';
import {StudentService} from './services/domain/students-service/student.service';

// import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  student$;
  user = {
    name: '',
    roll: '',
  };


  constructor(private studentService: StudentService) {

  }



  deleteStudent(id) {
    /*
    Complete this function to delete student and upon deletion of existing student based on the id of the student,
    It should prompt for a comfirmation for deletion and
    the updated list should be reflected in the UI
    */


  }

  createStudent(name, roll) {
    /*
    Complete this function to create new student taking parameters as name and roll
    and upon addition of new student, he should be reflected in the UI
    */


  }


  ngOnInit() {

    this.student$ = this.studentService.fetchStudent();


  }



}



