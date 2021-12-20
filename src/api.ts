import { TriggerConfig } from "react-hook-form";

const API_KEY = '1cf50e6248dc270629e802686245c2c8&language=ko-KR';
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  name?: string;
  media_type: string;
  genres: IGenres[];
  number_of_seasons: string;
}
interface IGenres {
  id: number;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
  // genres: IGenres[];
}
interface IGenres {
  id: number;
  name: string;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function topMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`
  ).then((response) => response.json());
}
 
export function upcomingMovie() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=5`
  ).then((response) => response.json());
}
//search
export interface ISearchResult {
  page: number;
  results: IMovie[];
}
export function searchAll(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
//tv
export interface IGetTv {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
interface ITv {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  name: string;
  release_date?: string;
}
export function getTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&page=4`
  ).then((response) => response.json());
}
export function getTopRatedTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&page=2`
  ).then((response) => response.json());
}
