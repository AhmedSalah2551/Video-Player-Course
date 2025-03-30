import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  constructor(public dialogRef: MatDialogRef<QuestionComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
  
  inputValue = '';
  onSubmit(){
    this.inputValue = '';
  }
}
