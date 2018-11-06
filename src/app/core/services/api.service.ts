import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const baseUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string;
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {
    this.syncToken();
   }
  // method for building headers based on tokens
  private makeHeaders(content_type?: string): HttpHeaders {
    let headers: HttpHeaders;
    const contenttype_present: boolean = content_type !== undefined && content_type !== null && content_type.trim() !== '';
    this.syncToken();
    const header_conf = {};
    header_conf['Authorization'] = this.token || '';
    if (!contenttype_present) {
      header_conf['Content-Type'] = 'application/json';
    }
    headers = new HttpHeaders(header_conf);
    return headers;
  }

  // method for building formData
  // appends files if present in the params
  private bodyMakeR(httpBody, name?: string, formData?: FormData) {
    name = name || '';
    formData = formData || new FormData();
    if (httpBody instanceof FileList) {
      const files = Array.from(httpBody);
      if (files.length > 1) {
        files.map((file, index) => {
          const ky = name + '[' + index + ']';
          formData.append(ky, file, file.name);
        });
      } else {
        formData.append(name, httpBody[0], httpBody[0].name);
      }
    } else if (!(httpBody instanceof FileList) && httpBody instanceof Object ) {
      for (const key in httpBody) {
        if (httpBody.hasOwnProperty(key)) {
          const val = httpBody[key];
          if (name === '') {
            this.bodyMakeR(val, key, formData);
          } else {
            const ky = name + '[' + key + ']';
            this.bodyMakeR(val, ky, formData);
          }
        }
      }
    } else {
      formData.append(name, httpBody);
    }
  }

  private paramGen(params?: any, content_type?: string): any {
    if (content_type !== undefined && content_type !== null && content_type.trim() !== '') {
      const fdata = new FormData();
      this.bodyMakeR(params, undefined, fdata);
      return fdata;
    } else {
      return JSON.stringify(params);
    }
  }

  // methods for making api calls to the server
  // tail_url is url string that suffixes our server base url e.g: '/login'
  // params is object, structure them like a json object e.g: {user: 'raghavendra'}
  // if you need to mutate the headers try reassigning with set like headers = headers.set('Authorization', 'value')
  public get(tail_url: string, params?: any, third_party?: boolean, content_type?: string): Observable<any> {
    const headers = third_party ? new HttpHeaders({'Content-Type': 'application/json'}) : this.makeHeaders(content_type);
    const url = third_party ? tail_url : `${baseUrl}${tail_url}`;
    return this.http.get(url, {
      headers: headers, params: params }
    ).pipe(catchError(this.handleErrors));
  }

  public post(tail_url: string, params?: any, content_type?: string): Observable<any> {
    const headers = this.makeHeaders(content_type);
    const url = baseUrl + tail_url;
    return this.http.post(url, this.paramGen(params, content_type), {
      headers: headers},
    ).pipe(catchError(this.handleErrors));
  }

  public put(tail_url: string, params?: any, content_type?: string): Observable<any> {
    const headers = this.makeHeaders(content_type);
    const url = baseUrl + tail_url;
    return this.http.put(url, this.paramGen(params, content_type), {
      headers: headers}
    ).pipe(catchError(this.handleErrors));
  }

  public delete(tail_url: string, params?: any, content_type?: string): Observable<any> {
    const headers = this.makeHeaders(content_type);
    const url = baseUrl + tail_url;
    return this.http.delete(url, {
      headers: headers, params: params }
    ).pipe(catchError(this.handleErrors));
  }

  public patch(tail_url: string, params?: any, content_type?: string): Observable<any> {
    const headers = this.makeHeaders(content_type);
    const url = baseUrl + tail_url;
    return this.http.patch(url, this.paramGen(params, content_type), {
      headers: headers,
    }).pipe(catchError(this.handleErrors));
  }

  public upload(tail_url: string, params: any, third_party?: boolean): Observable<any> {
    const headers = this.makeHeaders('multipart/form-data');
    const url = third_party ? tail_url : baseUrl + tail_url;
    const uploadReq = new HttpRequest('POST', url, this.paramGen(params, 'multipart/form-data'), {
      headers: headers,
      reportProgress: true
    });
    return this.http.request(uploadReq);
  }

  private syncToken() {
    this.token = this.storage.get('auth_token');
  }

  unauthLogOut(status: number) {
    if (status === 401) {
      this.storage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  private handleErrors(error: any) {
    return throwError(error);
  }
}
