import { Component, ChangeDetectorRef, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cursor-video';
  isLarge: boolean = false;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.onResize();
    this.onScrollY();
  }
  
  smallSize: boolean = window.innerWidth < 992;
  @HostListener('window:resize', [])
  onResize() {
    this.smallSize = window.innerWidth < 992;
  }
  
  isScrolled: boolean = false
  @HostListener('window:scroll', [])
  onScrollY(){
    this.isScrolled = window.scrollY >= 131
  }

  addNewItem(value: any) {
    this.isLarge = value;
    this.cdr.detectChanges();
  }
}
