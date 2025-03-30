import { ProgressComponent } from './progress/progress.component';
import { QuestionComponent } from './question/question.component';
import { Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  constructor(private dialogRef : MatDialog){}
  @Output() isTheater = new EventEmitter<boolean>();

  openQuestionDialog(){
    this.dialogRef.open(QuestionComponent, {
      panelClass: 'full-screen-question',
    });
  }
  
  openProgressDialog(){
    this.dialogRef.open(ProgressComponent, {
      panelClass: 'full-screen-progress',
    });
  }

  addNewItem(value: boolean) {
    this.isTheater.emit(value)
  }
  scrollToCourse() {
    const courseElement = document.getElementById('course-section');
    if (courseElement) {
      courseElement.scrollIntoView({ behavior: 'smooth' });
    }
  }  

  scrollToHeader() {
    const courseElement = document.getElementById('header-section');
    if (courseElement) {
      courseElement.scrollIntoView({ behavior: 'smooth' });
    }
  }  
}
