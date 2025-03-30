import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog'
import { ExamComponent } from './exam/exam.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  showPDF = false;
  pdfUrl: SafeResourceUrl;
  progress: number = 0;
  isLargeScreen: boolean = window.innerWidth >= 992;
  
  constructor(private sanitizer: DomSanitizer, private dialogRef : MatDialog) {
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Ahmed-Salah-Taha.pdf');

    window.addEventListener('resize', () => {
      this.isLargeScreen = window.innerWidth > 992;
    });
  }
  showPdf(){
    this.showPDF = true;
    this.scrollToHeader();
  }

  scrollToHeader() {
    const courseElement = document.getElementById('header-section');
    if (courseElement) {
      courseElement.scrollIntoView({ behavior: 'smooth' });
    }
  }  

  items = [
    { title: 'Course Introduction'},
    { title: 'Javascript Language Basics'},
    { title: 'Course Introduction'},
  ];

  ngOnInit() {
    let interval = setInterval(() => {
      if (this.progress < 70) {
        this.progress++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  activeIndex: number | null = null;

  toggleAccordion(index: number): void {
    if (!this.isLargeScreen) {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  }

  openExamDialog(){
      this.dialogRef.open(ExamComponent, {
        panelClass: 'full-screen-modal',
      });
    }
}
