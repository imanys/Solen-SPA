import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-email-registration-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['email-registration-success.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center" fxLayoutGap="30px">
        <mat-card-header>
          <mat-card-title>Please check your email!</mat-card-title>
          <mat-card-subtitle>We've sent a link to complete your signing up.
           Thank you!
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
           Please check your Spam folder if you did not receive this email.
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class EmailRegistrationSuccessComponent {

}
