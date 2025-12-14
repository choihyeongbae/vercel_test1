export interface Vector3 {
  x: number; // Tone (Happy vs Sad/Dark)
  y: number; // Intensity (Calm vs Intense/Fast)
  z: number; // Complexity (Simple/Fun vs Complex/Artistic)
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
  vector: Vector3;
  similarity?: number; // Calculated at runtime
}

export interface RecommendationResult {
  movie: Movie;
  score: number;
}
