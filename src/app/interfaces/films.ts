export interface IFilms {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: Date;
    species: string[];
    starships: string[];
    vehicles: string[];
    characters: string[];
    planets: string[];
    url: string; 
    created: string;
    edited: string;
}

export interface IFilmsMetaData {
    count: number;
    next: string;
    previous: string;
    results: IFilms[];
}