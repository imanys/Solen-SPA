import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['sidenav-list.component.scss'],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/auth/login" (click)="close()">
        <mat-icon>perm_identity</mat-icon>
        <span class="navigation-caption">Log in</span>
      </a>
      <a mat-list-item routerLink="/logout" (click)="close()">
        <mat-icon>power_settings_new</mat-icon>
        <span class="navigation-caption">Logout</span>
      </a>
      <a mat-list-item routerLink="/parametrage" (click)="close()">
        <mat-icon>settings</mat-icon>
        <span class="navigation-caption">Paramétrage</span>
      </a>
      <a mat-list-item routerLink="/questionnaires" (click)="close()">
        <mat-icon>question_answer</mat-icon>
        <span class="navigation-caption">Questionnaires</span>
      </a>
      <a mat-list-item routerLink="/utilisateurs" (click)="close()">
        <mat-icon>face</mat-icon>
        <span class="navigation-caption">Utilisateurs</span>
      </a>
    </mat-nav-list>
  `
})
export class SidenavListComponent {
  @Output() sidenavClosed = new EventEmitter<void>();

  close() {
    this.sidenavClosed.emit();
  }
}
