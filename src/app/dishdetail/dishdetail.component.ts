import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute} from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Comment } from '../shared/comment';


import {visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),  //calling function from app.animation.ts
      visibility(),
      expand()
    ]
})
export class DishdetailComponent implements OnInit {
 
    dish: Dish;
    dishcopy=null;
    dishIds: number[];
    prev: number;
    next: number;
    comment:Comment;
    errMess: string;
    visibility="shown";
    
 formErrors={
  'author':'',
  'comment': ''
};
    validationMessages = {
  'author':{
    'required': 'Author Name is required'
   },
  'comment':{
    'required': 'Comment is required'
  },
}; 
commentForm:FormGroup;
  constructor(private dishservice:DishService, private route:ActivatedRoute, private location:Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) { 
  
  }
  ngOnInit() {
    this.createForm();
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    
    this.route.params
    .pipe(switchMap((params: Params) =>{this.visibility='hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility='shown'; },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
  
  goBack(): void {
    this.location.back();
  }

   createForm(){
    this.commentForm=this.fb.group({
      author: ['', Validators.required],
      rating:5,
      comment: ['',Validators.required],
      date:['']
  
    });
  
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  
  this.onValueChanged(); // (re)set validation messages now
  
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date=new Date().toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
    .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    this.commentForm.reset({
      author:' ',
      rating:'',
      comment:' '
  
    });
    
  }
  
    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) { 
                this.formErrors[field] += messages[key] + ' ';
              
            }
          }
        }
      }
    }

  }
}
