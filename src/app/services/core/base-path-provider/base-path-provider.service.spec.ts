import {TestBed} from '@angular/core/testing';
import {BasePathProviderImplService} from './base-path-provider-impl.service';
import {BasePathProviderService, Service} from './base-path-provider.service';
import {InjectionTokens} from '../../injection-tokens';

describe('BasePathProviderService', () => {
  let service: BasePathProviderService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: InjectionTokens.BASE_PATH_PROVIDER_SERVICE, useClass: BasePathProviderImplService}
      ]
    });

    service = TestBed.get(InjectionTokens.BASE_PATH_PROVIDER_SERVICE);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('provide(Service): string', () => {
    it('should provide default when service not recognised', () => {
      // given
      const serviceName = 'unrecognised';

      // when
      const path = service.provide(serviceName as any);

      // then
      expect(path).toBeTruthy();
    });

    it('should provide basePath when service recognised', () => {
      // given
      const serviceName = Service.STUDENT_SERVICE;

      // when
      const path = service.provide(serviceName);

      // then
      expect(path).toBeTruthy();
    });
  });
});
