import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
    constructor(public dialogRef: MatDialogRef<ProgressComponent>) {}
    
    messages: any[] =[
      "مافيش حاجة مستحيلة على اللي بيجتهد وبيبذل أقصى جهده.",
      "كل خطأ هو فرصة للتعلم والتحسين، ما تكسلش وتستمر.",
      "دايماً اذكر إن أفضل المبرمجين بدأوا من مكانك ده بالضبط.",
      "خد الراحة لما تحتاجها، بس ما تستسلمش أبدًا.",
      "كل سطر كود بتكتبه بيخليك مبرمج أقوى"
    ]

      onClose(): void {
        this.dialogRef.close();
      }
}
