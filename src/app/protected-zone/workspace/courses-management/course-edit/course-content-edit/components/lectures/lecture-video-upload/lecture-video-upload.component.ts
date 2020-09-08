import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


import {Observable} from 'rxjs';
import {LecturesService} from '../../../../../shared/services';

@Component({
  selector: 'app-lecture-video-upload',
  styleUrls: ['lecture-video-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="file"
      style="display: none"
      #file
      (change)="onFileAdded($event)"
      accept="video/mp4"
    />

    <div fxLayout="column" fxLayoutGap="10px">
      <div fxFlex fxLayout fxLayoutGap="5px">
        <mat-form-field>
          <input matInput placeholder="Upload a media file" [value]="videoToUpload?.name" readonly [disabled]="uploading" (click)="addFiles()">
          <mat-hint align="end">
            Only video/mp4 format. Max size 300MB.
          </mat-hint>
          <mat-hint class="error" *ngIf="maxSizeError && !fileTypeError">
            Max size 300MB.
          </mat-hint>
          <mat-hint class="error" *ngIf="fileTypeError">
            Only video/mp4 format is supported.
          </mat-hint>
        </mat-form-field>
        <button mat-mini-fab color="accent" (click)="addFiles()" matTooltip="select a file">
          <mat-icon>attach_file</mat-icon>
        </button>
        <button mat-mini-fab color="primary" *ngIf="videoToUpload != null"
                (click)="upload()" [disabled]="maxSizeError || fileTypeError"
                matTooltip="upload the file">
          <mat-icon>cloud_upload</mat-icon>
        </button>
        <button mat-mini-fab color="warn" (click)="videoToUpload = null" *ngIf="videoToUpload != null"
                matTooltip="delete the selected file">
          <mat-icon>delete</mat-icon>
        </button>

      </div>


      <mat-progress-bar
        *ngIf="progress"
        mode="determinate"
        [value]="progress | async"
      ></mat-progress-bar>
    </div>
    <video
      #video
      style="display: none;"
      *ngIf="videoUrl"
      width="320"
      height="240"
      controls
      [attr.src]="videoUrl"
      (loadedmetadata)="getDuration($event)"
    ></video>
  `
})
export class LectureVideoUploadComponent {
  maxSize = 314572800;  // 300M
  supportedType = 'video/mp4';

  @Input() lectureId: string;
  @Input() lectureType: string;
  @Output() videoUploaded = new EventEmitter<number>();
  @Output() errorOccurred = new EventEmitter<any>();

  @ViewChild('file')
  file: ElementRef;

  videoToUpload: File;
  progress: Observable<number>;
  uploading: boolean;
  videoUrl;
  duration: number;

  constructor(
    private lecturesService: LecturesService,
    private sanitizer: DomSanitizer
  ) {
  }

  onFileAdded(event) {
    this.videoToUpload = event.target.files[0];
    if (this.videoToUpload) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.videoToUpload)
      );
    }
    this.file.nativeElement.value = '';
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  upload() {
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.lecturesService.uploadVideo(
      this.lectureId,
      this.videoToUpload,
      this.lectureType
    );

    this.progress.subscribe({
        complete: () => {
          this.uploading = false;
          this.videoUploaded.emit(this.duration);
        },
        error: (error) => {
          this.errorOccurred.emit(error);
        }
      },
    );
  }

  get maxSizeError(): boolean {
    return this.videoToUpload && this.videoToUpload.size > this.maxSize;
  }

  get fileTypeError(): boolean {
    return this.videoToUpload && this.videoToUpload.type !== this.supportedType;
  }

  getDuration(e) {
    this.duration = Math.floor(e.target.duration);
  }
}
