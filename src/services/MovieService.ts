import type { Movie } from "@/types/Movie";

const mockMovies: Movie[] = [
  {
    id: 1,
    name: "Superman",
    description: "O Homem de Aço retorna em uma nova aventura épica",
    director: "James Gunn",
    releaseYear: 2025,
    duration: 145,
    genre: "Ação/Aventura",
    rating: 5
  },
  {
    id: 2,
    name: "Castelo Animado",
    description: "Uma jovem é transformada em uma idosa por uma bruxa e busca ajuda em um castelo mágico",
    director: "Hayao Miyazaki",
    releaseYear: 2004,
    duration: 119,
    genre: "Animação/Fantasia",
    rating: 5
  },
  {
    id: 3,
    name: "O Gato na Cartola",
    description: "Uma aventura divertida baseada no livro do Dr. Seuss",
    director: "Bo Welch",
    releaseYear: 2003,
    duration: 82,
    genre: "Comédia/Família",
    rating: 4
  },
  {
    id: 4,
    name: "Gente Grande",
    description: "Cinco amigos de infância se reúnem após a morte de seu treinador de basquete",
    director: "Dennis Dugan",
    releaseYear: 2010,
    duration: 102,
    genre: "Comédia",
    rating: 4
  },
  {
    id: 5,
    name: "Duna 2",
    description: "A continuação épica da saga de Paul Atreides em Arrakis",
    director: "Denis Villeneuve",
    releaseYear: 2024,
    duration: 166,
    genre: "Ficção Científica/Aventura",
    rating: 5
  }
];

export const MovieService = {
  getAll: async (): Promise<Movie[]> => {
    return Promise.resolve(mockMovies);
  },

  getById: async (id: number): Promise<Movie | null> => {
    const movie = mockMovies.find(m => m.id === id);
    return Promise.resolve(movie || null);
  },

  create: async (movie: Omit<Movie, "id">): Promise<Movie> => {
    const newMovie = {
      ...movie,
      id: Math.max(...mockMovies.map(m => m.id)) + 1
    };
    mockMovies.push(newMovie);
    return Promise.resolve(newMovie);
  },

  update: async (id: number, movie: Partial<Movie>): Promise<Movie | null> => {
    const index = mockMovies.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    mockMovies[index] = { ...mockMovies[index], ...movie };
    return Promise.resolve(mockMovies[index]);
  },

  delete: async (id: number): Promise<boolean> => {
    const index = mockMovies.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    mockMovies.splice(index, 1);
    return Promise.resolve(true);
  }
};