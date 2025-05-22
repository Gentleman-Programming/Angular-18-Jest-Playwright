import { render, screen, waitFor } from "@testing-library/angular";
import { provideHttpClient } from "@angular/common/http";
import { MarvelCharactersComponent } from "./marvel-characters.component";
// Si tuviéramos un MarvelService, lo importaríamos y mockearíamos aquí.
// import { MarvelService } from '../services/marvel.service';
// import { of } from 'rxjs';

describe("MarvelCharactersComponent with Testing Library", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("should create and show loading message initially, then display characters", async () => {
    await render(MarvelCharactersComponent, {
      providers: [provideHttpClient()],
    });

    // Verificar mensaje de carga inicial
    expect(screen.getByText("Loading characters...")).toBeInTheDocument();

    // Avanzar timers para que se ejecute el setTimeout dentro de loadCharacters
    jest.runAllTimers();

    // Esperar a que el DOM se actualice
    await waitFor(() => {
      expect(
        screen.queryByText("Loading characters..."),
      ).not.toBeInTheDocument();
    });

    // Verificar que los personajes se muestran
    const characterNameElements = await screen.findAllByRole("heading", {
      level: 3,
    });
    expect(characterNameElements).toHaveLength(4);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Captain America")).toBeInTheDocument();
    expect(screen.getByText("Thor")).toBeInTheDocument();

    expect(
      screen.getByText(/Bitten by a radioactive spider/i),
    ).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
    expect(screen.getByAltText("Spider-Man")).toBeInTheDocument();
  });

  test('should display "No characters found." if characters array is empty after loading', async () => {
    const { fixture } = await render(MarvelCharactersComponent, {
      providers: [provideHttpClient()],
    });

    jest.runAllTimers();

    // Esperar a que desaparezca el "Loading..."
    await waitFor(() => {
      expect(
        screen.queryByText("Loading characters..."),
      ).not.toBeInTheDocument();
    });

    // Forzar el estado de "no personajes"
    fixture.componentInstance.characters = [];
    fixture.componentInstance.isLoading = false;
    fixture.detectChanges();

    // Verificar directamente con findByText (que espera) y queryByText
    expect(await screen.findByText("No characters found.")).toBeInTheDocument();
    expect(screen.queryByText("Spider-Man")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading characters...")).not.toBeInTheDocument();
  });

  test("should display error message if errorMessage is set and not loading", async () => {
    const { fixture } = await render(MarvelCharactersComponent, {
      providers: [provideHttpClient()],
    });

    jest.runAllTimers();
    await waitFor(() => {
      expect(
        screen.queryByText("Loading characters..."),
      ).not.toBeInTheDocument();
    });

    // Forzar el estado de error
    fixture.componentInstance.errorMessage = "Test Error Message";
    fixture.componentInstance.isLoading = false;
    fixture.componentInstance.characters = [];
    fixture.detectChanges();

    expect(await screen.findByText("Test Error Message")).toBeInTheDocument();
    expect(screen.queryByText("Loading characters...")).not.toBeInTheDocument();
    const characterHeadings = screen.queryAllByRole("heading", { level: 3 });
    expect(characterHeadings.length).toBe(0);
  });

  test("getThumbnailUrl should return correct URL (logic test, no DOM)", () => {
    const component = new MarvelCharactersComponent();
    const character = {
      id: 1,
      name: "Test",
      description: "",
      thumbnail: { path: "http://example.com/img", extension: "png" },
    };
    expect(component.getThumbnailUrl(character)).toBe(
      "http://example.com/img.png",
    );
  });
});
