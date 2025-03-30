import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
    commentForm !: FormGroup;
    inpValue:any ='';
    constructor(private fb : FormBuilder){}
    comments : any[] = [
    {
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s",
      name: "Goes Here",
      date: "Oct 10, 2021",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    },
    {
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcCrG8e7pK1rQDigvWWNSmAcBJdIGdDYc0Ww&s",
      name: "Goes Here",
      date: "Oct 10, 2021",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    },
    {
      avatar: "https://cdn.lucidpic.com/cdn-cgi/image/w=600,format=auto,metadata=none/66c43b25bee70.png",
      name: "Goes Here",
      date: "Oct 10, 2021",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    }
  ]
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment:['',Validators.required]
    });
    const storedArray = localStorage.getItem('myArray');
      if (storedArray) {
        this.comments = JSON.parse(storedArray);
      }
  }

  add(){
    this.comments.push({
      name: 'You',
      date:Date.now(),
      avatar: 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg',
      comment:this.inpValue
    });
    this.inpValue='';
    this.saveArray();
  }
  
  saveArray() {
    localStorage.setItem('myArray', JSON.stringify(this.comments));
  }
}
