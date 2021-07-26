/* **** Nasrullah*****/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/assets/app-config.service';
export class MenuItem {
  path: string;
  title: string;
  parent: string;
  icon?: string;
}
@Injectable({
  providedIn: 'root'
})
export class CommonSrvService {
  // appSettings: any = (appSettings as any).default;
  UsersAPIURL: any;
  activeMenuItem$: Observable<MenuItem>;
  pageTitle = new BehaviorSubject<string>('');
  OID = new BehaviorSubject<number>(0);
  constructor(private titleService: Title, private http: HttpClient, private route: Router, private domSanitizer: DomSanitizer, private router: Router,private appConfigService: AppConfigService) { 
    this.UsersAPIURL = environment.UsersAPIURL;
  }
  postNoAuth(URL: string, data: any) {
    return this.http.post(this.UsersAPIURL + URL, JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'No-Auth': 'True' } });
  }
  getNoAuth(URL: string, id?: any | null) {
    return this.http.get(this.UsersAPIURL + URL + (id == null ? '' : id), { headers: { 'Content-Type': 'application/json', 'No-Auth': 'True' } });
  }
  postJSON(URL: string, data: any) {   
    console.log(this.UsersAPIURL + URL, JSON.stringify(data), { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem(environment.AuthToken)}` } });
    return this.http.post(this.UsersAPIURL + URL, JSON.stringify(data), { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem(environment.AuthToken)}` } });
  }
  getJSON(URL: string, id?: any | null) {
    console.log('get json called');
    console.log(this.UsersAPIURL + URL + (id == null ? '' : id), { headers: { Authorization: `Bearer ${localStorage.getItem(environment.AuthToken)}` } });
    return this.http.get(this.UsersAPIURL + URL + (id == null ? '' : id), { headers: { Authorization: `Bearer ${localStorage.getItem(environment.AuthToken)}` } });
  }
  getUserDetails(): UsersModel {

    return JSON.parse(atob(localStorage.getItem(environment.AuthToken)));
  }
  public TrimFields(obj: any): any {
    if (obj === null && !Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.trim()] = typeof obj[key] === 'string' ?
        obj[key].trim() : typeof obj[key] === 'object' ? this.TrimFields(obj[key]) : obj[key];
      return acc;
    }, Array.isArray(obj) ? [] : {});
  }
  public RemSpaceFields(obj: any): any {
    if (obj === null && !Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.trim().replace(/\s/g, '')] = typeof obj[key] === 'string' ? obj[key].trim() : typeof obj[key] === 'object' ? this.RemSpaceFields(obj[key]) : obj[key];
      return acc;
    }, Array.isArray(obj) ? [] : {});

  }

  userAuthentication(URL: string, data: any) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(this.UsersAPIURL + URL, data, { headers: reqHeader });
  }

}
export class UsersModel {
   Token : string;
}
