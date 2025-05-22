import { render, fireEvent, screen } from "@testing-library/angular";
import { RegisterComponent } from "./register.component";
import { AuthService } from "../services/auth.service";
import { provideHttpClient } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { ReactiveFormsModule } from "@angular/forms";

describe("RegisterComponent", () => {
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      register: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    delete (window as any).location;
    window.location = { href: "" } as any;
  });

  it("debería redirigir a login en registro exitoso", async () => {
    authServiceMock.register.mockReturnValueOnce(of({ success: true }));

    await render(RegisterComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideHttpClient(),
      ],
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(authServiceMock.register).toHaveBeenCalledWith(
      "newuser@example.com",
      "password123",
    );
    expect(window.location.href).toBe("/login");
  });

  it("debería mostrar un mensaje de error en registro fallido", async () => {
    authServiceMock.register.mockReturnValueOnce(
      throwError(() => ({ error: { message: "Email already exists" } })),
    );

    await render(RegisterComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideHttpClient(),
      ],
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "existinguser@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(authServiceMock.register).toHaveBeenCalledWith(
      "existinguser@example.com",
      "password123",
    );
    const errorMessage = await screen.findByText("Email already exists");
    expect(errorMessage).toBeTruthy();
  });

  it("debería mostrar un mensaje de error si las contraseñas no coinciden y deshabilitar el botón", async () => {
    // Ajuste en la descripción del test también
    await render(RegisterComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideHttpClient(),
      ],
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password456" }, // Contraseña diferente
    });
    fireEvent.blur(screen.getByPlaceholderText("Confirm Password"));

    const passwordMismatchError = await screen.findByText(
      "Passwords do not match",
    );
    expect(passwordMismatchError).toBeTruthy();
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled(); // <-- AQUÍ LA CORRECCIÓN
  });
});
