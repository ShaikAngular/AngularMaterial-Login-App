import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as shajs from 'sha.js';
import { tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(  private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log("credentials", this.form.value)
    // const a = shajs("sha256").update(this.form.value.userName).digest("hex");
    // const encryptUserName = btoa(a);
    const encryptUserName = btoa(this.form.value.userName);

    // const b = shajs("sha256").update(this.form.value.password).digest("hex");
    // const encryptPassword = btoa(b);

    const encryptPassword = btoa(this.form.value.password);
    //console.log('encrypted username-->', a, 'encrypted password-->', b);
    console.log('base64 username-->', encryptUserName, 'base64 password-->', encryptPassword);
    if (this.form.valid) {
      //this.authService.login(this.form.value);
      this.loginService.postDetails(encryptUserName, encryptPassword)
      .pipe(
        tap(a=>console.log('a-->',a))
      )
      .subscribe(
        (response:any)=>{
          console.log("API Response", response.Result.APIResponse);
          if(response.Result.APIResponse == "Success"){
            window.alert("Credentials are correct");
          } else{
            window.alert("credentials are not correct")
          }
        },
        (error:any)=>{
          window.alert("failed")
        }
      )
    }
    this.formSubmitAttempt = true;
  }

  // postLogin(){
  //   console.log("username-->", this.loginForm.value.username, "password-->", this.loginForm.value.password);
  //   this.loginService.postDetails(this.loginForm.value.username, this.loginForm.value.password)
  //   .pipe(
  //     tap(a=>console.log('a-->',a))
  //   )
  //   .subscribe()
  // }

}
