import {Component, Input, ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-video-player',
  styleUrls: ['app-video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <video #video controls>
      Your browser does not support the video tag.
    </video>
  `
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges {
  @Input() videoTitle: string;
  @Input() videoUrl: string;

  @Input() autoplay = false;

  @ViewChild('video') video: ElementRef;

  ngAfterViewInit() {
    this.loadVideo();
  }

  ngOnChanges(): void {
    this.loadVideo();
  }

  loadVideo() {
    if (this.video) {
      this.video.nativeElement.src = this.videoUrl;
      this.video.nativeElement.load();
      if (this.autoplay) {
        this.video.nativeElement.play();
      }
    }
  }
}
