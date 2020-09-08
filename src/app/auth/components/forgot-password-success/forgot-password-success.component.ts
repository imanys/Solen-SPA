import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-forgot-password-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['forgot-password-success.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center" fxLayoutGap="30px">
        <mat-card-header>
          <mat-card-title>Please check your email!</mat-card-title>
          <mat-card-subtitle>We've sent you a link to reset your password.
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ForgotPasswordSuccessComponent {

}
