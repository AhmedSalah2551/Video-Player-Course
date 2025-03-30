import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './pages/header/header.component';
import { VideoComponent } from './pages/video/video.component';
import { CourseMaterialComponent } from './pages/course-material/course-material.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ExamComponent } from './pages/topics/exam/exam.component';
import { ProgressComponent } from './pages/video/progress/progress.component';
import { QuestionComponent } from './pages/video/question/question.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomVideoPlayerComponent } from './pages/video/custom-video-player/custom-video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoComponent,
    CourseMaterialComponent,
    TopicsComponent,
    CommentsComponent,
    ExamComponent,
    ProgressComponent,
    QuestionComponent,
    CustomVideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
