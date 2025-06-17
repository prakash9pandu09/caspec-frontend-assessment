export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharacterOrigin {
  name: string;
  url: string;
}
export interface CharacterLocation {
  name: string;
  url: string;
}
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface EpisodeResponseInfo {
  count: number;
  pages: number,
  next: string;
  prev: number;
}
export interface EpisodeResponse {
  info: EpisodeResponseInfo;
  results: Episode[]
}