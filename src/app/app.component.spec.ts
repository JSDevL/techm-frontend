import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {StudentService} from './services/domain/student-service/student.service';
import {DebugElement} from '@angular/core';
import {of, throwError} from 'rxjs';
import {By} from '@angular/platform-browser';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {FormsModule} from '@angular/forms';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let studentService: StudentService;

  const studentServiceSpyObj: SpyObj<StudentService> = createSpyObj('studentServiceSpyObj', [
    'fetchStudents', 'deleteStudent', 'addStudent'
  ]);

  beforeEach(async(() => {
    studentServiceSpyObj.fetchStudents.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: StudentService, useValue: studentServiceSpyObj}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        studentService = TestBed.get(StudentService);
      });
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should populate table with fetched students', () => {
    // given
    studentServiceSpyObj.fetchStudents.and.returnValue(of([
      {name: 'Arfath', roll: '14BCA4225'},
      {name: 'Arfath1', roll: '14BCA4225_1'}
    ]));

    // when
    fixture.detectChanges();

    // then
    expect(de.queryAll(By.css('.student-row')).length).toEqual(2);
  });

  it('should populate table with fetched students when new student is added', () => {
    // given
    studentServiceSpyObj.addStudent.and.returnValue(of({
      name: 'Arfath', roll: '14BCA4225'
    }));
    studentServiceSpyObj.fetchStudents.and.returnValue(of([
      {name: 'Arfath', roll: '14BCA4225'},
    ]));

    // when
    component.createStudent('Arfath', '14BCA4225');
    fixture.detectChanges();

    // then
    expect(de.queryAll(By.css('.student-row')).length).toEqual(1);
  });

  it('should alert user when attempting to add duplicate Student', () => {
    // given
    studentServiceSpyObj.addStudent.and.returnValue(throwError({
      error: {message: 'Some Error'}
    }));
    spyOn(window, 'alert').and.stub();

    // when
    component.createStudent('Arfath', '14BCA4225');
    fixture.detectChanges();

    // then
    expect(window.alert).toHaveBeenCalledWith('Some Error');
  });

  it('should populate table with fetched students when student is deleted', () => {
    // given
    studentServiceSpyObj.deleteStudent.and.returnValue(of(undefined));
    studentServiceSpyObj.fetchStudents.and.returnValue(of([]));
    spyOn(window, 'confirm').and.returnValue(true);

    // when
    component.deleteStudent(1);
    fixture.detectChanges();

    // then
    expect(de.queryAll(By.css('.student-row')).length).toEqual(0);
  });
});
