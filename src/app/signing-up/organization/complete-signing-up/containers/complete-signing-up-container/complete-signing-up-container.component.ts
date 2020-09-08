import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Subscription} from 'rxjs';
import {CompleteOrganizationSigningUpCommand} from 'src/app/models';

import * as fromServices from '../../services';


@Component({
  selector: 'app-complete-signing-up-container',
  template: `
    <app-complete-signing-up *ngIf="!isCreationSucceeded"
                             (completeSigningUp)="completeSigningUp($event)"
                             [isLoading]="isLoading">
    </app-complete-signing-up>
    <app-signing-up-success *ngIf="isCreationSucceeded">

    </app-signing-up-success>
  `
})
export class CompleteSigningUpContainerComponent implements OnInit, OnDestroy {
  isCreationSucceeded = false;
  isLoading = false;
  creationSubscription: Subscription;
  paramSubscription: Subscription;
  token: string;

  constructor(private service: fromServices.CompleteSigningUpService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.paramSubscription = this.route.queryParams
      .subscribe(params => this.token = params.token);
  }


  completeSigningUp(command: CompleteOrganizationSigningUpCommand) {
    this.isLoading = true;
    command = {...command, signingUpToken: this.token};
    this.creationSubscription = this.service.completeSigningUp(command).subscribe(() => {
      this.isCreationSucceeded = true;
    }, error => {
      this.isLoading = false;
      this.matSnackBar.open(error, 'Close', {
        duration: 5 * 1000,
        panelClass: 'red-snackbar'
      });
    });
  }

  ngOnDestroy() {
    if (this.creationSubscription) {
      this.creationSubscription.unsubscribe();
    }
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

