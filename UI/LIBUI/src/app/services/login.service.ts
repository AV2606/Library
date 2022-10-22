import { Injectable } from '@angular/core';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  isDev = true;

  private users: User[] = [{ userName: 'av', password: '123456', isAdmin: true, email: 'mail@example.com' }]
  private readonly token = 'token';

  constructor() {

    console.log('ive been contructed');

    if (this.isDev) {
      console.log('remember to make real values');
      sessionStorage.setItem(this.token, 'av');
    }
  }


  /**
   * tries to log in the user and stores its credentials for further use
   * @param userName the user name
   * @param password the password
   * @returns true if the user was able to log in, false otherwise.
   */
  async Login(userName: string, password: string, remember = false) {
    let r = false;
    this.users.forEach(element => {
      if (element.userName == userName)
        if (element.password == password) {
          r = true;
          if (remember) {
            localStorage.setItem(this.token, userName);
            sessionStorage.removeItem(this.token);
          }
          else {
            sessionStorage.setItem(this.token, userName);
            localStorage.removeItem(this.token);
          }
        }
    });
    return r;
  }

  async logOut() {
    sessionStorage.setItem(this.token, '');
    localStorage.setItem(this.token, '');
  }

  private getUserToken() {
    let sess = sessionStorage.getItem(this.token);
    let local = localStorage.getItem(this.token);
    if (sess && sess != '')
      return sess;
    if (local && local != '')
      return local;
    return '';//dev
  }

  /**
   * sets the token of the currently logged in user.
   * @param newtoken the new token to sign.
   */
  private setUserToken(newtoken: string) {
    if (sessionStorage.getItem(this.token))
      sessionStorage.setItem(this.token, newtoken);
    else
      localStorage.setItem(this.token, newtoken);
  }

  async isUserLoggedIn() {
    if (sessionStorage.getItem(this.token) != '')
      return true;//sessionStorage.getItem(token);
    if (localStorage.getItem(this.token) != '')
      return true;//localStorage.getItem(token);
    return false;
  }

  async isAdmin(userName: string, password: string) {
    let r = false;
    this.users.forEach(element => {
      if (element.userName == userName)
        if (element.password == password)
          if (element.isAdmin)
            r = true;
    });
    return r;
  }

  async signUp(username: string, email: string, password: string) {
    let status: SignUpStatus = {
      isEmailGood: true,
      isUserNameGood: true
    };
    this.users.forEach(element => {
      if (element.email == email)
        status.isEmailGood = false;
      if (element.userName == username)
        status.isUserNameGood = false;
    });

    if (status.isEmailGood == false || status.isUserNameGood == false)
      return status;

    this.users.push({
      userName: username,
      password: password,
      email: email
    });

    sessionStorage.setItem(this.token, username);

    return new UserData(username, email);
  }

  async changePassword(oldpass: string, newpass: string): Promise<'succes' | 'unknown fail' | 'incorrect password' | 'user not logged in'> {
    const u = await this.getUser();
    if (u == undefined)
      return 'user not logged in';
    if (await this.isPassword(oldpass) == false)
      return 'incorrect password';
    let us = this.users.find((element) => {
      return element.userName == u.name;
    });
    if (us)
      us.password = newpass;
    else
      return 'unknown fail'
    if (us.password != newpass)
      return 'unknown fail';
    return 'succes';
  }

  async isPassword(pass: string) {
    let r = false;
    this.users.forEach(element => {
      if (element.userName == this.getUserToken() && element.password == pass)
        r = true;
    });
    return r;
  }

  async getUser() {
    const t = this.getUserToken();

    if (t == 'demo') {
      return new UserData('avichay vaknin', 'mail@example.com');
    }
    let r = undefined;
    this.users.forEach(element => {
      if (t == element.userName)
        r = new UserData(element.userName, element.email);
    });
    return r;
  }

  private async getUserRef(): Promise<User | undefined> {
    const t = this.getUserToken();

    if (t == 'demo') {
      return {
        userName: 'avichay vaknin',
        password: '123456',
        email: 'example@email.com',
        isAdmin: true
      };
    }
    let r = undefined;
    this.users.forEach(element => {
      if (t == element.userName)
        r = element
    });
    return r;
  }

  async setName(newName: string): Promise<'success' | 'unknown error' | 'user not signed in'> {
    let user = await this.getUserRef();
    console.log(user);

    let r: 'success' | 'unknown error' | 'user not signed in' = 'unknown error';
    if (user != undefined) {
      user.userName = newName;
      this.setUserToken(newName);

      r = 'success';
    }
    else {
      r = 'user not signed in';
    }
    return r;
  }

  async setMail(newmail: string) {
    let r = 'unknown error';
    await this.getUserRef().then((resolve) => {
      if (resolve) {
        resolve.email = newmail;
        r = 'success';
      }
      else {
        r = 'user not signed in';
      }
    });
    console.log(
      (await this.getUser())?.email);
    return r;
  }

}

export interface SignUpStatus {
  isEmailGood: boolean,
  isUserNameGood: boolean,
}

export class UserData {
  public name: string;
  public email: string;

  constructor(name: string, mail: string) {
    this.name = name;
    this.email = mail;
  }
}

export interface User {
  userName: string,
  password: string,
  email: string,
  isAdmin?: boolean
}
