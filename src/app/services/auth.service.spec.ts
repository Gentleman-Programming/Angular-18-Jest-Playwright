import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify(); // verificar que no haya solicitudes pendientes
  });

  it('debería realizar login correctamente', async () => {
    const mockResponse = { token: 'fake-jwt-token' };

    const login$ = service.login('user@example.com', 'password123');
    const loginPromise = firstValueFrom(login$); // convertir a Promise para facilitar el test

    const req = httpTesting.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'user@example.com',
      password: 'password123',
    });

    req.flush(mockResponse); // simular respuesta exitosa del backend

    expect(await loginPromise).toEqual(mockResponse);
  });

  it('debería manejar errores del backend', async () => {
    const mockError = { message: 'Invalid credentials' };

    const login$ = service.login('user@example.com', 'wrongpassword');
    const loginPromise = firstValueFrom(login$); // convertir a Promise para facilitar el test

    const req = httpTesting.expectOne('/api/login');
    req.flush(mockError, { status: 401, statusText: 'Unauthorized' });

    await expect(loginPromise).rejects.toMatchObject({
      error: mockError,
      status: 401,
    });
  });
});
