import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {LoggedUserDto} from '../../../../../models';


@Component({
  selector: 'app-workspace-header',
  styleUrls: ['header.component.scss'],
  template: `
    <mat-toolbar color="primary">

      <mat-toolbar-row class="mat-toolbar-row-top">
        <div fxHide.gt-xs>
          <button (click)="toggle()" mat-icon-button>
            <mat-icon>menu</mat-icon>
          </button>
        </div>
        <div>
          <a routerLink="/workspace/dashboard"><img src="assets/images/solen-logo-transparent.png" width="70" height="70"> </a>
        </div>
        <div fxFlex fxLayout fxLayoutAlign="flex-end" fxHide.lt-sm>
          <a routerLink="/workspace/notifications" class="header-link">
            <button mat-icon-button>
              <mat-icon class="icon">notifications</mat-icon>
              <span class="badge" *ngIf="notificationsCount">{{notificationsCount}}</span>
            </button>
          </a>
          <ul fxLayout class="navigation-items">
            <li>
              <a routerLink="/workspace/my-courses" class="header-link">My courses</a>
            </li>
            <li *appHasRole="['Admin', 'Instructor']">
              <a routerLink="/workspace/courses-management" class="header-link">Instructor</a>
            </li>
            <li *appHasRole="['Admin', 'Instructor']">
              <a routerLink="/workspace/learning-paths" class="header-link">Learning paths</a>
            </li>
            <li *appHasRole="['Admin']">
              <a routerLink="/workspace/users" class="header-link">Users</a>
            </li>
            <li>
              <a [matMenuTriggerFor]="menu" class="header-link">{{ loggedUser?.userName }}</a>
            </li>
          </ul>
          <mat-menu #menu="matMenu">
            <a mat-menu-item routerLink="/workspace/my-profile">
              <mat-icon>face</mat-icon>
              My Profile
            </a>
            <a mat-menu-item routerLink="/workspace/settings" *appHasRole="['Admin']">
              <mat-icon>settings</mat-icon>
              Settings
            </a>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="onLogOut()">
              <mat-icon>power_settings_new</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar-row>
      <mat-toolbar-row class="mat-toolbar-row-bottom">
        {{breadcrumb}}
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class HeaderComponent implements OnDestroy {
  @Input() loggedUser: LoggedUserDto;
  @Input() notificationsCount: number;
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() logOut = new EventEmitter<void>();

  breadcrumbSubscription: Subscription;
  breadcrumb: string;

  constructor(private router: Router, private route: ActivatedRoute) {

    this.breadcrumbSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map((currentRoute) => {
          while (currentRoute.firstChild && !currentRoute.data.breadcrumb) {
            currentRoute = currentRoute.firstChild;
          }
          return currentRoute;
        }))
      .subscribe((activatedRoute) => {
        this.breadcrumb = activatedRoute.data.breadcrumb;
      });
  }

  ngOnDestroy() {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

  toggle() {
    this.sidenavToggle.emit();
  }

  onLogOut() {
    this.logOut.emit();
  }
}
