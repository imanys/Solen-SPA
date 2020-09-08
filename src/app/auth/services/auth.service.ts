import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  LoginUserQuery, LoggedUserDto,
  CheckPasswordTokenQuery,
  ForgotPasswordCommand, ResetPasswordCommand,
  LoggedUserViewModel
} from 'src/app/models/models';


const tokenName: string = document.baseURI + 'SolenToken';
const refreshTokenName: string = document.baseURI + 'SolenRefreshToken';

@Injectable()
export class AuthService {
  readonly endPoint = `${this.env.apiUrl}/auth`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  logUser(request: LoginUserQuery): Observable<LoggedUserViewModel> {
    return this.http
      .post<LoggedUserViewModel>(`${this.endPoint}/login`, request)
      .pipe(
        tap(viewModel => this.setTokens(viewModel.token, viewModel.refreshToken)),
        catchError((error: any) => throwError(error)));
  }

  refreshToken(): Observable<LoggedUserViewModel> {
    const refreshToken = localStorage.getItem(refreshTokenName);
    return this.http
      .get<LoggedUserViewModel>(`${this.endPoint}/refreshToken/${refreshToken}`)
      .pipe(
        tap(viewModel => this.setTokens(viewModel.token, viewModel.refreshToken)),
        catchError((error: any) => throwError(error)));
  }

  currentUser(): Observable<LoggedUserDto> {
    return this.http
      .get<LoggedUserDto>(`${this.endPoint}/currentUser`)
      .pipe(catchError((error: any) => throwError(error)));
  }


  forgotPassword(command: ForgotPasswordCommand) {
    return this.http
      .post(`${this.endPoint}/forgotPassword`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  checkPasswordToken(passwordToken: string) {
    const query: CheckPasswordTokenQuery = {passwordToken};
    return this.http
      .post(`${this.endPoint}/checkPasswordToken`, query)
      .pipe(catchError((error: any) => throwError(error)));
  }

  resetPassword(command: ResetPasswordCommand) {
    return this.http
      .post(`${this.endPoint}/resetPassword`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getLoggedUserRoles() {
    const token = localStorage.getItem(tokenName);
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    if (decodedToken) {
      if (typeof decodedToken.role === 'string') {
        return decodedToken.role.split() as Array<string>;
      }

      return decodedToken.role as Array<string>;
    }
    return [];
  }

  logOut() {
    localStorage.removeItem(tokenName);
    localStorage.removeItem(refreshTokenName);
    window.location.href = `${document.baseURI}auth/login`;
  }

  getToken() {
    return localStorage.getItem(tokenName);
  }

  setTokens(token, refreshToken) {
    localStorage.setItem(tokenName, token);
    localStorage.setItem(refreshTokenName, refreshToken);
  }
}
