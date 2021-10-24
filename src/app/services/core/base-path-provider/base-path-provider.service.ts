export enum Service {
  STUDENT_SERVICE = 'STUDENT_SERVICE'
}

export interface BasePathProviderService {
  provide(forService: Service): string;
}
