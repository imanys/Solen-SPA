import {LoginComponent} from './login/login.component';
import {ForgotPasswordContainerComponent} from './forgot-password-container/forgot-password-container.component';
import {ResetPasswordContainerComponent} from './reset-password-container/reset-password-container.component';

export const containers: any[] = [
  LoginComponent,
  ForgotPasswordContainerComponent,
  ResetPasswordContainerComponent
];

export * from './login/login.component';
export * from './forgot-password-container/forgot-password-container.component';
export * from './reset-password-container/reset-password-container.component';
