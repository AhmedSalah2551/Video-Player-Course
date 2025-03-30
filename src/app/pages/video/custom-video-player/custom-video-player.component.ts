import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
interface Video {
  id: number;
  title: string;
  url: string;
}

@Component({
  selector: 'app-custom-video-player',
  templateUrl: './custom-video-player.component.html',
  styleUrls: ['./custom-video-player.component.scss'],
})
export class CustomVideoPlayerComponent {
  @Output() isTheater = new EventEmitter<boolean>();
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  videoUrls: string[] = ['assets/video1.mp4', 'assets/video2.mp4'];
  currentVideoIndex = 0;
  isPaused = true;
  showControls = true;
  isTheaterMode = false;
  volume = 1;
  progress = 0;
  playbackRate = 1; 
  currentTime = 0;
  duration = 0;


  ngAfterViewInit() {
    this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
      this.duration = this.videoElement.nativeElement.duration;
    });
  }
  
  smallSize: boolean = window.innerWidth < 992;
  @HostListener('window:resize', [])
  onResize() {
    this.smallSize = window.innerWidth < 992;
  }


  get volumeIcon() {
    if (this.volume === 0) return 'bi-volume-mute-fill';
    if (this.volume < 0.5) return 'bi-volume-down-fill';
    return 'bi-volume-up-fill';
  }

  
  togglePlay() {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      video.play();
      this.isPaused = false;
    } else {
      video.pause();
      this.isPaused = true;
    }
  }

  changeSpeed() {
    const video = this.videoElement.nativeElement;
    const speeds = [0.25, 0.5, 1, 1.5, 2]; 
    const currentIndex = speeds.indexOf(this.playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length; 
    this.playbackRate = speeds[nextIndex];
    video.playbackRate = this.playbackRate;
  }

  toggleMute() {
    const video = this.videoElement.nativeElement;
    video.muted = !video.muted;
    this.volume = video.muted ? 0 : video.volume;
  }

  changeVolume() {
    const video = this.videoElement.nativeElement;
    video.volume = this.volume;
  
    const volumeControl = document.querySelector('.volume-control input[type="range"]') as HTMLElement;
    if (volumeControl) {
      volumeControl.style.setProperty('--volume', this.volume.toString());
    }
  }
  
  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${this.padTime(minutes)}:${this.padTime(remainingSeconds)}`;
  }
  
  private padTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  updateTimeline() {
    const video = this.videoElement.nativeElement;
    this.currentTime = video.currentTime;
    this.duration = video.duration;
    this.progress = (this.currentTime / this.duration) * 100 || 0;
  }

  startSeeking(event: MouseEvent) {
    const video = this.videoElement.nativeElement;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * video.duration;
    video.currentTime = newTime;
  }

  toggleFullscreen() {
    const video = this.videoElement.nativeElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  }

  togglePictureInPicture() {
    const video = this.videoElement.nativeElement;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  }

  toggleTheaterMode() {
    this.isTheaterMode = !this.isTheaterMode;
    this.isTheater.emit(this.isTheaterMode);
  }

  nextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoUrls.length;
    this.videoElement.nativeElement.load();
    this.videoElement.nativeElement.play();
    this.isPaused = false;
  }

  showControlsTemporarily() {
    this.showControls = true;
    clearTimeout((this as any).controlsTimeout);
    (this as any).controlsTimeout = setTimeout(() => {
      this.showControls = false;
    }, 3000);
  }
}