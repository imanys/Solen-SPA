import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['expansion-panel.component.scss'],
  template: `
    <mat-expansion-panel hideToggle="true"
                         [expanded]="expanded"
                         (opened)="opened.emit()"
                         (closed)="closed.emit()"
                         [class.errors]="errors">
      <mat-expansion-panel-header (click)="hideToggle()">
        <ng-content select="[slot=drag-handle]"></ng-content>
        <mat-panel-title fxLayout>
          <div fxFlex="80">
            <app-minus-icon *ngIf="expanded"></app-minus-icon>
            <app-plus-icon *ngIf="!expanded"></app-plus-icon>
            <ng-content select="[slot=title]"></ng-content>
          </div>
          <div
            fxFlex="20"
            fxLayout
            fxLayoutAlign="end"
            *ngIf="!hideHeaderRightSide()"
          >
            <ng-content
              select="[slot=header-right-side-content]"
              class="content"
            ></ng-content>
          </div>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <ng-content select="[slot=content]"></ng-content>
      <mat-action-row fxLayout fxLayoutAlign="center">
        <ng-content select="[slot=actions]"></ng-content>
      </mat-action-row>
    </mat-expansion-panel>
  `
})
export class ExpansionPanelComponent {
  @Input() hideHeaderRightSideWhenExpanded = false;
  @Input() expanded = false;
  @Input() errors: boolean;

  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  hideToggle() {
    this.expanded = !this.expanded;
  }

  hideHeaderRightSide(): boolean {
    return this.expanded && this.hideHeaderRightSideWhenExpanded;
  }

  constructor() {
  }
}
