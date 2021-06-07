import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

  private url = "http://localhost:3000/api/users";
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<User>>(this.url);
  }

  createUser(user: User) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<User>(this.url, JSON.stringify(user), { headers: myHeaders });
  }
  updateUser(user: User) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<User>(this.url, JSON.stringify(user), { headers: myHeaders });
  }
}
