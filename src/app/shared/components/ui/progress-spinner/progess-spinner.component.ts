import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { OverlayRef, OverlayConfig } from '@angular/cdk/overlay';

import * as fromServices from '../../../services';

@Component({
  selector: 'app-progress-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #progressSpinnerRef>
      <mat-progress-spinner
        [color]="color"
        [diameter]="diameter"
        [mode]="mode"
        [strokeWidth]="strokeWidth"
        [value]="value"
      >
      </mat-progress-spinner>
    </ng-template>
  `
})
export class ProgressSpinnerComponent {
  @Input() color?: ThemePalette = 'primary';
  @Input() diameter?: number = 100;
  @Input() mode?: ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth?: number;
  @Input() value?: number = 50;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean;

  @ViewChild('progressSpinnerRef')
  private progressSpinnerRef: TemplateRef<any>;
  private progressSpinnerOverlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;
  constructor(
    private vcRef: ViewContainerRef,
    private overlayService: fromServices.OverlayService
  ) {}
  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig[
        'positionStrategy'
      ] = this.overlayService.positionGloballyCenter();
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.overlayService.createOverlay(
      this.progressSpinnerOverlayConfig
    );
  }
  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      this.overlayService.attachTemplatePortal(
        this.overlayRef,
        this.progressSpinnerRef,
        this.vcRef
      );
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
