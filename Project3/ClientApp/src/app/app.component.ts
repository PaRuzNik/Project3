import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [UserService]

})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any> | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any> | undefined;

  editedUser: User | null = null;
  users: Array<User>;
  isNewRecord: boolean = false;
  statusMessage: string = "";

  constructor(private serv: UserService) {
    this.users = new Array<User>();
  }

  ngOnInit()
  {
    this.loadUsers();
  }

  private loadUsers() {
    this.serv.getUsers().subscribe((data: Array<User>) => {
      this.users = data;
    });
  }

  addUser() {
    this.editedUser = new User("", "", 0);
    this.users.push(this.editedUser);
    this.isNewRecord = true;
  }

  editUser(user: User) {
    this.editedUser = new User(user.name, user.surname, user.age);
  }
  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser.surname === user.surname) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  saveUser() {
    if (this.isNewRecord) {
      this.serv.createUser(this.editedUser as User).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      this.serv.updateUser(this.editedUser as User).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadUsers();
      });
      this.editedUser = null;
    }
  }
  cancel() {
    if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }
}
