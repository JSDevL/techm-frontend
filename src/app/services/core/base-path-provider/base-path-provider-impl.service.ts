import {Injectable} from '@angular/core';
import {BasePathProviderService, Service} from './base-path-provider.service';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class BasePathProviderImplService implements BasePathProviderService {
  provide(forService: Service): string {
    if (!environment.basePath[forService]) {
      return environment.basePath[Service.STUDENT_SERVICE];
    }

    return environment.basePath[forService];
  }
}
