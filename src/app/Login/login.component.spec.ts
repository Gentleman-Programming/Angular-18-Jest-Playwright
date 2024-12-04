import { render, fireEvent, screen } from '@testing-library/angular';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    delete (window as any).location; // redefinir window.location para evitar errores
    window.location = { href: '' } as any;
  });

  it('debería redirigir al dashboard en login exitoso', async () => {
    authServiceMock.login.mockReturnValueOnce(of({ token: 'fake-jwt-token' }));

    await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideHttpClient(),
      ],
    });

    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(authServiceMock.login).toHaveBeenCalledWith(
      'user@example.com',
      'password123'
    );
    expect(window.location.href).toBe('/dashboard');
  });

  it('debería mostrar un mensaje de error en login fallido', async () => {
    authServiceMock.login.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideHttpClient(),
      ],
    });

    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(authServiceMock.login).toHaveBeenCalledWith(
      'user@example.com',
      'wrongpassword'
    );
    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeTruthy();
  });
});
