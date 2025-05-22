import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  http = inject(HttpClient);

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("/api/login", { email, password });
  }

  // Nuevo método para registrar usuarios
  register(email: string, password: string): Observable<any> {
    // Puedes ajustar el tipo de respuesta según tu API
    return this.http.post<any>("/api/register", { email, password });
  }
}
