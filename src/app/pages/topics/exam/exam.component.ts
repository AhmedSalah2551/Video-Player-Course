import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
  isCorrect?: boolean;
}
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})

export class ExamComponent {
  questions: Question[] = [
    { question: 'ما هو إطار العمل الذي تستخدمه؟', options: ['React', 'Vue', 'Angular', 'Svelte'], correctAnswer: 2 },
    { question: 'ما لغة البرمجة الأساسية لـ Angular؟', options: ['Java', 'C#', 'JavaScript', 'TypeScript'], correctAnswer: 3 },
    { question: 'ما هو HTTP؟', options: ['Protocol', 'Language', 'Database', 'IDE'], correctAnswer: 0 },
    { question: 'ما هو CSS؟', options: ['Styling', 'Backend', 'Framework', 'Library'], correctAnswer: 0 },
    { question: 'ما هي مخرجات 2 + "2" في JavaScript؟', options: ['4', '22', 'NaN', 'Error'], correctAnswer: 1 }
  ];
  activeButton: number = 1;
  minutes: number = 1;
  seconds: number = 0;
  finish : boolean = false;
  private interval: any;
  question : number = 0;

  constructor(public dialogRef: MatDialogRef<ExamComponent>, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadSavedAnswers();
    this.startTimer();
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        this.finish = true;
        this.showResult();
        clearInterval(this.interval);
      } else {
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  setActive(buttonNumber: number): void {
    this.activeButton = buttonNumber;
  }

  prevButton(): void {
    this.cdr.detectChanges();
    this.activeButton = this.activeButton === 1 ? 5 : this.activeButton - 1;
  }

  selectAnswer(questionIndex: number, optionIndex: number): void {
    if (this.finish) return;

    this.questions[questionIndex].selectedAnswer = optionIndex;
    this.questions[questionIndex].isCorrect = optionIndex === this.questions[questionIndex].correctAnswer;
    
    // حفظ الإجابة في localStorage
    localStorage.setItem('exam_answers', JSON.stringify(this.questions));

    if (this.questions.every(q => q.selectedAnswer !== undefined)) {
      this.showResult();
    }
  }

  loadSavedAnswers(): void {
    const savedAnswers = localStorage.getItem('exam_answers');
    if (savedAnswers) {
      this.questions = JSON.parse(savedAnswers);
      if (this.questions.every(q => q.selectedAnswer !== undefined)) {
        this.finish = true;
      }
    }
  }

  message: string= "";
  
  getEncouragementMessage() {
    const score = this.questions.filter(q => q.isCorrect).length;
    if (score == 5) {
      this.message = 'ممتاز! لقد أجبت على جميع الأسئلة بشكل صحيح!';
    } else if (score >= 3) {
      this.message = 'جيد جدًا! لقد أديت بشكل رائع!';
    } else if (score >= 1) {
      this.message = 'حاول مرة أخرى! يمكنك التحسن.';
    } else {
      this.message = 'لا بأس، التدريب يؤدي إلى الإتقان!';
    }
  }
  

  showResult(): void {
    const score = this.questions.filter(q => q.isCorrect).length;
    
    this.getEncouragementMessage();
    this.finish = true;
    clearInterval(this.interval);
  }

  restartExam(): void {
    this.questions.forEach(q => {
      q.selectedAnswer = undefined;
      q.isCorrect = undefined;
    });

    this.minutes = 1;
    this.seconds = 0;
    this.startTimer();
    this.finish = false;
    this.activeButton = 1;
    localStorage.removeItem('exam_answers');
  }

  onClose(): void {
    this.dialogRef.close();
  }

  setActiveQuestion(index: number): void {
    this.activeButton = index + 1;
    this.cdr.detectChanges();
  }
}
