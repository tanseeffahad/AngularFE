import { Component, OnInit } from '@angular/core';
import { CommonSrvService } from 'src/app/CommanServices/common-srv.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


interface Tasks {
  TaskId: number;
  Name: string;
  IsDeleted:boolean;
}

@Component({
  selector: 'app-bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.scss']
})
export class BulkDeleteComponent implements OnInit {
  taskform: FormGroup;
  Tasks=[];
  error: String;title: string; savebtn: string;
  isSubmitted = false;
  constructor(private modalService: NgbModal,private http: CommonSrvService,private fb: FormBuilder,private router: Router) {
    this.taskform = this.fb.group({     
        Tasks: []
  });
 };


// when checkbox change, add/remove the item from the array
onChange(checked, item){
  if(checked){
    var objIndex = this.Tasks.findIndex((obj => obj.taskId == item.taskId));
    this.Tasks[objIndex].isDeleted = true;
  } else {  
    var objIndex = this.Tasks.findIndex((obj => obj.taskId == item.taskId));
    this.Tasks[objIndex].isDeleted = false;  
  }
}


  ngOnInit(): void {
    this.GetTasks();
  }

  Submit() {
    console.log(this.Tasks);
    this.http.postJSON("api/delete-task-bulk", this.Tasks).subscribe((response: any) => {
      if(response.response!=null && response.success==true)
      {        
        this.router.navigate(['/list-tasks']);
      }
      else{
        alert(response.message);
      }
    },
      error => {
       // this.Common.ShowError(error.error, "Close");
      })
  
}
reset() {
  this.taskform.reset();
}


  GetTasks() {     
    this.http.getJSON('api/list-tasks').subscribe((d: any) => {
      this.Tasks = d.response;
    }, error => this.error = error // error path
    );
  }

  //get Name() { return this.taskform.get("Name"); }
}



