import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {BasePathProviderService, Service} from '../../core/base-path-provider/base-path-provider.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Student} from '../../../domain/model/student';
import {Injectable} from '@angular/core';
import {InjectionTokens} from '../../injection-tokens';

describe('StudentService', () => {
  let service: StudentService;
  let controller: HttpTestingController;

  @Injectable()
  class BasePathProviderServiceStub implements BasePathProviderService {
    provide(forService: Service): string {
      return '';
    }
  }

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: InjectionTokens.BASE_PATH_PROVIDER_SERVICE, useClass: BasePathProviderServiceStub},
        StudentService,
      ]
    });

    const basePathProviderService: BasePathProviderService = TestBed.get(InjectionTokens.BASE_PATH_PROVIDER_SERVICE);
    spyOn(basePathProviderService, 'provide').and.returnValue('host');

    service = TestBed.get(StudentService);
    controller = TestBed.get(HttpTestingController);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchStudents(): Observable<Student[]>', () => {
    it('should resolve with list of students', (done) => {
      // given

      // when
      service.fetchStudents().subscribe((students) => {
        // then
        expect(students.length).toEqual(1);
        expect(students[0]).toEqual({name: 'Arfath', roll: '14BCA4225'});
        done();
      });

      const req = controller.expectOne('host/api/v1/students');
      req.flush([
        {
          name: 'Arfath',
          roll: '14BCA4225'
        }
      ] as Student[]);
      controller.verify();
    });
  });

  describe('deleteStudent(string): Observable<Student[]>', () => {
    it('should resolve when successful', (done) => {
      // given

      // when
      service.deleteStudent(1).subscribe(() => {
        // then
        done();
      });

      const req = controller.expectOne('host/api/v1/students/1');
      req.flush({});
      expect(req.request.method).toEqual('DELETE');
      controller.verify();
    });

    it('should reject when not found', (done) => {
      // given

      // when
      service.deleteStudent(1).subscribe((students) => {
        // then
        fail();
      }, (e) => {
        expect(e).toBeTruthy();
        done();
      });

      const req = controller.expectOne('host/api/v1/students/1');
      req.flush({}, {status: 404, statusText: 'Not found'});
      expect(req.request.method).toEqual('DELETE');
      controller.verify();
    });
  });

  describe('addStudent(string, string): Observable<Student>', () => {
    it('should resolve when successful', (done) => {
      // given

      // when
      service.addStudent('Arfath', '14BCA4225').subscribe((student) => {
        // then
        expect(student).toEqual({
          id: 1,
          name: 'Arfath',
          roll: '14BCA4225'
        });
        done();
      });

      const req = controller.expectOne('host/api/v1/students');
      req.flush({
        id: 1,
        name: 'Arfath',
        roll: '14BCA4225'
      });
      expect(req.request.method).toEqual('POST');
      controller.verify();
    });

    it('should reject when not found', (done) => {
      // given

      // when
      service.addStudent('Arfath', '14BCA4225').subscribe((students) => {
        // then
        fail();
      }, (e) => {
        expect(e).toBeTruthy();
        done();
      });

      const req = controller.expectOne('host/api/v1/students');
      req.flush({}, {status: 400, statusText: 'Bad request'});
      expect(req.request.method).toEqual('POST');
      controller.verify();
    });
  });
});
