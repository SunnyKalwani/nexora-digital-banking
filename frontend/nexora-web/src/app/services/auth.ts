import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email: email,
      password: password,
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('nexora_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('nexora_token');
  }

  logout(): void {
    localStorage.removeItem('nexora_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expirationTime = payload.exp * 1000;

      if (Date.now() >= expirationTime) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }
}
