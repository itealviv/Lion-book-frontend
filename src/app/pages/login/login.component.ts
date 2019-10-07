import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, User } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;

  constructor(public dataService: DataService, private snackBar: MatSnackBar) {
    this.dataService.logInCheck.subscribe((value: any) => {
      if (value) {
        this.openSnackBar(value);
        if (value.loginName) {
          this.dataService.goBack();
        }
        this.dataService.resetLogInCheck();
      }
    });
  }

  openSnackBar(value) {
    const data = (value.message) ? 'Неправильний Email або пароль. Спробуйте ще раз.' : 'Авторизація успішна';
    const panelClass = (value.message) ? 'snack-error' : 'snack-success';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      data,
      panelClass
    });
  }

  logIn() {
    const user: User = {
      login: this.logInForm.value.loginName,
      password: this.logInForm.value.password
    };
    console.log(user);
    this.dataService.logIn(user);
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      loginName: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }
}
