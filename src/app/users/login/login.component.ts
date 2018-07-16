import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private router: Router, 
    private http: Http,
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(){
    
  }


  public login() {
    this.http.post('/api/users/login', this.form.value)
    .map((response) => response.json())
    .subscribe(res => {
        console.log(res);
        
      }
    )
  }
}
