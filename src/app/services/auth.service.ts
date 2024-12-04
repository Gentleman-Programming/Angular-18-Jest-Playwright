import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient)

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/login', { email, password });
  }
}
