import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {ErrorInterceptorProvider} from './app-error.interceptor';
import {EnvironmentServiceProvider} from '../environments/environment.service.provider';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// store
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import {Action, ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

// jwt
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';

// not used in production
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// modules
import {AppRoutingModule} from 'src/app/app-routing/app-routing.module';

import {AppComponent} from './app.component';
import {environment} from 'src/environments/environment';
import {EnvironmentService} from '../environments/environment.service';

import * as fromRouter from 'src/app/app-routing/store';
import * as fromAuth from './auth/store/actions';
import * as fromAuthServices from './auth/services';


export function clearSate(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: Action) => {
    if (action.type === fromAuth.logOut.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<any>[] = [clearSate];

export function jwtOptionsFactory(envService: EnvironmentService) {
  return {
    tokenGetter: () => localStorage.getItem(document.baseURI + 'SolenToken'),
    allowedDomains: envService.whitelistedDomains,
    disallowedRoutes: envService.blacklistedRoutes
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [EnvironmentService]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    StoreModule.forRoot(fromRouter.reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
      metaReducers
    }),
    EffectsModule.forRoot(fromRouter.effects),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [
    EnvironmentService,
    fromAuthServices.AuthService,
    ErrorInterceptorProvider,
    EnvironmentServiceProvider,
    {provide: RouterStateSerializer, useClass: fromRouter.CustomSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
