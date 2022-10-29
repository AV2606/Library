import { Component, OnInit, ViewChild } from '@angular/core';
import { hasAny } from 'src/app/classes/Functions';
import { showToast } from 'src/app/classes/Toast';
import { UsersService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showChangePass = false;
  showIncorrectOldPass = false;
  showPassNotTheSame = false;

  showEditMail = false;
  showInvalidMail = false;

  showEditName = true;
  showInvalidName = false;
  invalidNameText = 'Invalid name';


  mail: string | undefined = 'example@mail.com';
  fname: string | undefined = 'avichay vaknin';
  borrows = 2;

  constructor(private UsersService: UsersService) {
    this.getInfo();
    this.resetIndicators();
    UsersService.isUserLoggedIn().then(resolve=>{
      if(!resolve)
      UsersService.goToLogin();
    })
  }


  ngOnInit(): void {
  }

  getInfo() {
    this.UsersService.getUser().then((resolve) => {
      this.mail = resolve?.email;
      this.fname = resolve?.name;
    })
  }

  async logOut() {
    this.UsersService.logOut();
  }

  resetIndicators() {
    this.showChangePass = false;
    this.showIncorrectOldPass = false;
    this.showPassNotTheSame = false;

    this.showEditMail = false;
    this.showInvalidMail = false;

    this.showEditName = false;
    this.showInvalidName = false;
    this.invalidNameText = 'Invalid name';
  }

  showSeeMore() {
    this.resetIndicators();
    alert('implement me');
  }

  showChangeName() {
    this.resetIndicators();
    this.showEditName = true;
  }

  showChangeMail() {
    this.resetIndicators();
    this.showEditMail = true;
  }
  showChangePassword() {
    this.resetIndicators();
    this.showChangePass = true;
  }

  showContactSupport() {
    this.resetIndicators();
    alert('implement me');
  }

  async changeName(newname: string) {
    if (hasAny(newname, '1234567890-=!@#$%^&*()_+[]{}<>?\'\\/":;*|')) {
      this.showInvalidName = true;
      if (hasAny(newname, ' ') == false) {
        this.showInvalidName = true;
        this.invalidNameText += ', forgot last name?'
      }
      return;
    }
    else {
      let ans = await this.UsersService.setName(newname);
      this.fname = (await this.UsersService.getUser())?.name;

      showToast({
        text: ans
      });
    }
  }

  async changeMail(newmail: string) {
    if (newmail.toLocaleUpperCase().match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.showInvalidMail = false;
      let ans = await this.UsersService.setMail(newmail);
      console.log(ans);

      if (ans == 'success') {
        this.mail = (await this.UsersService.getUser())?.email;
        console.log(this.mail);

        showToast({
          text: 'mail changed succesfuly',
          duration: 3
        });
      }
    }
    else {
      this.showInvalidMail = true;
    }
  }

  async changePassword(oldpass: string, newpass1: string, newpass2: string) {
    if (newpass1 != newpass2) {
      this.showPassNotTheSame = true;
      return;
    }
    let ans = await this.UsersService.changePassword(oldpass, newpass1);
    this.toast(ans);
  }

  toast(message: string) {
    showToast({
      duration: 4,
      text: message
    });
  }

}
