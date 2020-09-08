import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-signing-up-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['signing-up-success.component.scss'],
  template: `
    <div fxLayout
         fxLayoutAlign="center">
      <mat-card fxLayout="column"
                fxLayoutAlign="center center" fxLayoutGap="20px">
        <mat-card-header>
          <mat-card-title>Your account has been created!</mat-card-title>
          <mat-card-subtitle>Now you can log in. Enjoy!
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <a mat-flat-button color="primary" [routerLink]="['/auth/login']">Log in</a>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class SigningUpSuccessComponent {

}
