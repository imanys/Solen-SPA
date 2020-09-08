import {Component, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Subscription} from 'rxjs';
import {ForgotPasswordCommand} from 'src/app/models';

import * as fromServices from '../../services';

@Component({
  selector: 'app-forgot-password-container',
  template: `
    <app-forgot-password *ngIf="!isForgotPasswordSuccess"
                         (forgotPassword)="forgotPassword($event)"
                         [isLoading]="isLoading">
    </app-forgot-password>
    <app-forgot-password-success *ngIf="isForgotPasswordSuccess">

    </app-forgot-password-success>
  `
})
export class ForgotPasswordContainerComponent implements OnDestroy {
  isForgotPasswordSuccess = false;
  isLoading = false;
  forgotPasswordSubscription: Subscription;

  constructor(private service: fromServices.AuthService,
              private matSnackBar: MatSnackBar) {
  }


  forgotPassword(command: ForgotPasswordCommand) {
    this.isLoading = true;
    this.forgotPasswordSubscription = this.service.forgotPassword(command).subscribe(() => {
      this.isForgotPasswordSuccess = true;
    }, error => {
      this.isLoading = false;
      this.matSnackBar.open(error, 'Close', {
        duration: 5 * 1000,
        panelClass: 'red-snackbar'
      });
    });
  }

  ngOnDestroy() {
    if (this.forgotPasswordSubscription) {
      this.forgotPasswordSubscription.unsubscribe();
    }
  }
}

