import { Component, OnInit } from '@angular/core';  
import { StudentService } from '../student.service';  
import { Student } from '../student';  
import { Observable,Subject } from "rxjs";  
  
import {FormControl,FormGroup,Validators} from '@angular/forms';  
  
@Component({  
  selector: 'app-student-list',  
  templateUrl: './student-list.component.html',  
  styleUrls: ['./student-list.component.css']  
})  
export class StudentListComponent implements OnInit {  
  
 constructor(private studentservice:StudentService) { }  
  
  studentsArray: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  
  students: Observable<Student[]>;  
  student : Student=new Student();  
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false;      
   
  
  ngOnInit():void {  
    this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    this.studentservice.getStudentList().subscribe(data =>{  
    this.students =data;  
    //this.dtTrigger.next(); //// Call the dtTrigger to rerender again
    })  
  }  
    
  deleteStudent(id: number) {  
    this.studentservice.deleteStudent(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.studentservice.getStudentList().subscribe(data =>{  
            this.students =data  
            })  
        },  
        error => console.log(error));  
  }  
  
  updateStudent(id: number){  
    this.studentservice.getStudent(id)  
      .subscribe(  
        data => {  
          this.studentlist=data             
        },  
        error => console.log(error));  
  }  
  
  studentupdateform=new FormGroup({  
    student_id:new FormControl(),  
    student_name:new FormControl(),  
    student_email:new FormControl(),  
    student_branch:new FormControl()  
  });  
  
  updateStu(updstu:any){  
    this.student=new Student();   
   this.student.student_id=updstu.StudentId.value;  
   this.student.student_name=updstu.StudentName.value;  
   this.student.student_email=updstu.StudentEmail.value;  
   this.student.student_branch=updstu.StudentBranch.value;  
   console.log(updstu.StudentBranch.value);  
     
  
   this.studentservice.updateStudent(this.student.student_id,this.student).subscribe(  
    data => {       
      this.isupdated=true;  
      this.studentservice.getStudentList().subscribe(data =>{  
        this.students =data  
        })  
    },  
    error => console.log(error));  
  }  
  
  get StudentName(){  
    return this.studentupdateform.get('student_name');  
  }  
  
  get StudentEmail(){  
    return this.studentupdateform.get('student_email');  
  }  
  
  get StudentBranch(){  
    return this.studentupdateform.get('student_branch');  
  }  
  
  get StudentId(){  
    return this.studentupdateform.get('student_id');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
  }  
}  
