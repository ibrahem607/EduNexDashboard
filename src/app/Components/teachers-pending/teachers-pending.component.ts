import { Component } from '@angular/core';
import { TeacherService } from 'src/app/Services/teacher/teacher.service';

@Component({
  selector: 'app-teachers-pending',
  templateUrl: './teachers-pending.component.html',
  styleUrls: ['./teachers-pending.component.css']
})
export class TeachersPendingComponent {

 constructor(private teacherService:TeacherService){}
 teacherPendingData: any[] = [];
 addcomment:string |null=null;

 ngOnInit(): void {

  this.getAllPendingTeacher();
  this.addcomment=null;
 }

  getAllPendingTeacher():any
 {
  console.log(this.teacherService.getAllTeacherPending().subscribe({
    next:(response)=>
      {
         console.log(response)
         this.teacherPendingData=response;
      },
      error:(err)=>
        {
          console.log(`error:${err.error}`)
        }
  }))
 }



 Approve(id:string)
 {
  this.teacherService.ApproveTeacherProfile(id).subscribe({
    next:(respon)=>{
      this.getAllPendingTeacher()
      console.log(respon);

    },
    error:(err)=>
      {
      this.getAllPendingTeacher()
        console.log(err);
      }
  })
 }

 sendInfo(id: string, info: string) {
  console.log(info)
  console.log(id)

  if (!info.trim()) {

    return; 
  }else
  {
    const aboutTeacher ={
      accountNote: info.toString(),
     //  accountNote: " "
   } 
    this.teacherService.saveTeacherAccountNote(id,aboutTeacher).subscribe(
      (response) => {
        console.log('Update successful:', response);
      },
      (error) => {
        
      }
    );
  }

 
}
 Reject(id:string)
 {
  this.addcomment = id;
  // this.teacherService.RejectTeacherProfile(id).subscribe({
  //   next:(respon)=>{
  //     this.getAllPendingTeacher()
  //     console.log(respon);
  //   },
  //   error:(err)=>
  //     {
  //       console.log(err);
  //       this.getAllPendingTeacher()
  //     }

  // })
 }
}
