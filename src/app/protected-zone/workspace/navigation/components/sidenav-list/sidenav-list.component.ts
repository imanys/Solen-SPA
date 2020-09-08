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
    </mat-nav-list>
  `
})
export class SidenavListComponent {
  @Output() sidenavClosed = new EventEmitter<void>();

  close() {
    this.sidenavClosed.emit();
  }
}
