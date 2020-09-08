import {Component, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Subscription} from 'rxjs';
import {InitSigningUpCommand} from 'src/app/models';

import * as fromServices from '../../services';

@Component({
  selector: 'app-email-registration-container',
  template: `
    <app-email-registration *ngIf="!isRegistrationSucceeded"
                            (initSigningUp)="initSigningUp($event)"
                            [isLoading]="isLoading">
    </app-email-registration>
    <app-email-registration-success *ngIf="isRegistrationSucceeded">

    </app-email-registration-success>
  `
})
export class EmailRegistrationContainerComponent implements OnDestroy {
  isRegistrationSucceeded = false;
  isLoading = false;
  registrationSubscription: Subscription;

  constructor(private service: fromServices.InitSigningUpService,
              private matSnackBar: MatSnackBar) {
  }


  initSigningUp(command: InitSigningUpCommand) {
    this.isLoading = true;
    this.registrationSubscription = this.service.initSigningUp(command).subscribe(() => {
      this.isRegistrationSucceeded = true;
    }, error => {
      this.isLoading = false;
      this.matSnackBar.open(error, 'Close', {
        duration: 5 * 1000,
        panelClass: 'red-snackbar'
      });
    });
  }

  ngOnDestroy() {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}

