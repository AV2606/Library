import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, SignUpStatus, UserData } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe: any = true;
  showMismatchPass = false;
  showUsedUsername = false;
  showInvalidMail = false;
  showTakenMail = false;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  async signIn(userName: any, password: any) {
    let ans = await this.usersService.Login(userName, password, this.rememberMe);
    console.log(ans);

    if (ans == false)
      document.getElementsByClassName('cant-sign-label')[0].classList.remove('hidden');
    else
      this.router.navigate(['home']);
  }

  async signUp(username: any, email: string, pass1: any, pass2: any) {
    console.log('username=> ', username);
    console.log('email=> ', email);
    console.log('password=> ', pass1);
    console.log('password repeat=> ', pass2);

    let signup = true;

    if (!email.toLocaleUpperCase().match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.showInvalidMail = true;
      signup = false;
    }

    if (pass1 != pass2) {
      this.showMismatchPass = true;
      signup = false;
    }
    if (signup) {
      let s = await this.usersService.signUp(username, email, pass1);
      let data = s as UserData;
      let status = s as SignUpStatus;

      if (status.isEmailGood == false) {
        this.showTakenMail = true;
      }
      if (status.isUserNameGood == false)
        this.showUsedUsername = true;
    }
  }

  /**
   * occurse when the sign in or ssign up clicked
   * @param element the sign up or sign in element.
   */
  signClick(element: HTMLElement, obsoleteEl: HTMLElement, relevantDiv: HTMLElement, obsoleteDiv: HTMLElement) {
    element.classList.add('active-sign');
    obsoleteEl.classList.remove('active-sign');

    relevantDiv.classList.remove('hidden');
    relevantDiv.classList.add('sign-div-active')
    obsoleteDiv.classList.add('hidden');
    obsoleteDiv.classList.remove('sign-div-active');
  }
}
