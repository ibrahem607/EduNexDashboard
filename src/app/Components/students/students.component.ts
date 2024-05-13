import { Component } from '@angular/core';
import { data } from 'jquery';
import { StudentService } from 'src/app/Services/student/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  constructor(private stdService:StudentService){}
  
  ngOnInit(): void{

   this.stdService.getAllStudent().subscribe(
    {
      next:(data=>{
        console.log(data)
      })
    }
   );
  }
}
