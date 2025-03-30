import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.scss']
})
export class CourseMaterialComponent {
  materials :any[] = [
    {
      id :1,
      info: "Instructor",
      value: "Edward Norton",
      icon: "bi bi-person"
    },
    {
      id:2,
      info: "Duration",
      value: "3 weeks",
      icon: "bi bi-clock"
    },
    {
      id:3,
      info: "Lessons",
      value: "Enrolled",
      icon: "bi bi-menu-button-wide"
    },
    {
      id:4,
      info: "Enrolled",
      value: "65 students",
      icon: "bi bi-book",
    },
    {
      id:5,
      info: "Language",
      value: "English",
      icon: "bi bi-circle"
    }
  ]

    smallSize: boolean = window.innerWidth < 992;
    @HostListener('window:resize', [])
    onResize() {
      this.smallSize = window.innerWidth < 992;
    }
  
}
