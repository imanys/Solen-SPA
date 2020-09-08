import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Subscription} from 'rxjs';
import {ResetPasswordCommand} from 'src/app/models';

import * as fromServices from '../../services';


@Component({
  selector: 'app-reset-password-container',
  template: `
    <app-reset-password *ngIf="!isResetSucceeded"
                        (resetPassword)="resetPassword($event)"
                        [isLoading]="isLoading">
    </app-reset-password>
    <app-reset-password-success *ngIf="isResetSucceeded">

    </app-reset-password-success>
  `
})
export class ResetPasswordContainerComponent implements OnInit, OnDestroy {
  isResetSucceeded = false;
  isLoading = false;
  resetSubscription: Subscription;
  paramSubscription: Subscription;
  token: string;

  constructor(private service: fromServices.AuthService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.paramSubscription = this.route.queryParams
      .subscribe(params => this.token = params.token);
  }


  resetPassword(command: ResetPasswordCommand) {
    this.isLoading = true;
    command = {...command, passwordToken: this.token};
    this.resetSubscription = this.service.resetPassword(command).subscribe(() => {
      this.isResetSucceeded = true;
    }, error => {
      this.isLoading = false;
      this.matSnackBar.open(error, 'Close', {
        duration: 5 * 1000,
        panelClass: 'red-snackbar'
      });
    });
  }

  ngOnDestroy() {
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

