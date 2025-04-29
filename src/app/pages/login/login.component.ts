import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from '../../interface/users.interface';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { emailFormatValidator } from 'src/app/shared/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  loginForm: FormGroup;
  registerForm: FormGroup;
  public toast_type:number = 0;
  public toast_message:string = '';
  public toast_show:boolean = false;
  public toastTimeout:any;
  public showLoginForm: boolean = true;
  constructor(private fb: FormBuilder, private sessionS: SessionService, private router: Router, private authService: AuthService) {
    this.users$ = this.sessionS.users;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailFormatValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, emailFormatValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmpassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedInGuard()) {
      this.router.navigate(['/home']);
    }
    this.sessionS.loadInitialItems();
  }

  ngOnDestroy(): void {
  }

  onSubmitRegister(): void {
    if(this.registerForm.valid){
      this.sessionS.validateIfEmailExist(this.registerForm.value.email)
      .subscribe((exist) => {
        if (exist) {
          this.onShowToast(1, 'Email ya existente');
          this.showLoginForm = true;
        } else {
          this.onShowToast(0, 'Usuario Creado');
          this.sessionS.addUser(this.registerForm.value);
          this.showLoginForm = true;
        }
      })
    } else {
      this.onShowToast(1, 'Formulario Invalido');
    }
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.sessionS.validateIfExist(this.loginForm.value)
      .subscribe((exist) => {
        if (exist) {
          this.onShowToast(0, 'Bienvenido...');
          const expirationTime = new Date().getTime() + 5 * 60 * 1000;
          localStorage.setItem('token', expirationTime.toString());
          localStorage.setItem('user', JSON.stringify(this.loginForm.value));
          this.router.navigate(['/home']);
        }
        else {
          this.onShowToast(1, 'Usuario no encontrado');
        }
      })
    } else {
      this.onShowToast(1, 'Formulario Invalido');
    }
  }

  showRegisterForm(loginForm:boolean): void {
    this.showLoginForm = loginForm;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  public onShowToast(type:number = 0, message:string):void {
    this.toast_message = message;
    this.toast_show = true;
    this.toast_type = type;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.toast_show = false;
    }, 3000);
  }
}
