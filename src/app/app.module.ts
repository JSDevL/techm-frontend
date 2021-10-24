import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {StudentService} from './services/domain/student-service/student.service';
import {FormsModule} from '@angular/forms';
import {InjectionTokens} from './services/injection-tokens';
import {BasePathProviderImplService} from './services/core/base-path-provider/base-path-provider-impl.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    StudentService,
    {provide: InjectionTokens.BASE_PATH_PROVIDER_SERVICE, useClass: BasePathProviderImplService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
