import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-nex-prev',
  styleUrls: ['next-prev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="prev-next" fxLayout fxLayoutAlign="center" fxLayoutGap="10px">
      <button mat-raised-button color="accent" [disabled]="isFirstLecture" (click)="onPreviousClick()">
        < Prev
      </button>
      <button mat-raised-button color="accent"  [disabled]="isLastLecture" (click)="onNextClick()">
        Next >
      </button>
    </div>
  `
})
export class NextPrevComponent {
  @Input() isLastLecture: boolean;
  @Input() isFirstLecture: boolean;
  @Output() nextClick = new EventEmitter();
  @Output() previousClick = new EventEmitter();


  onNextClick() {
    this.nextClick.emit();
  }

  onPreviousClick() {
    this.previousClick.emit();
  }
}
