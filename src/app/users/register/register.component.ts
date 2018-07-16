import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private router: Router, 
    private http: Http,
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(){
    
  }


  public save() {
    this.http.post('/api/users', this.form.value)
    .map((response) => response.json())
    .subscribe(res => {
        if(res.status == true){
          alert(res.message)
        }else{
          alert(res.message)
        }
        
      }
    )
  }
}
