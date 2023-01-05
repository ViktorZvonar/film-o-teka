import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export default class Api {
  constructor() {
    this.KEY = 'c23d7755b502540a74ef819e02a6a593';
    this.page = 1;
    this.query = '';
    this.id = null;
    this.genre = '';
    this.year = '';
    this.vote = '';
  }

  async getTrendingFilms() {
    const r = await axios
      .get(
        `/trending/movie/week?api_key=${this.KEY}&language=en-US&page=${this.page}`
      )
      .then(res => res.data);
    return r.results;
  }

  async getTrendingFilmsByPage(page) {
    const r = await axios
      .get(
        `/trending/movie/week?api_key=${this.KEY}&language=en-US&page=${page}`
      )
      .then(res => res.data);
    return r;
  }

  async getFilmBySearch() {
    const r = await axios
      .get(
        `/search/movie?api_key=${this.KEY}&query=${this.query}&language=en-US&page=${this.page}`
      )
      .then(res => res.data);
    return r.results;
  }

  async getFilmSearchByPage(page) {
    const r = await axios
      .get(
        `/search/movie?api_key=${this.KEY}&query=${this.query}&language=en-US&page=${page}`
      )
      .then(res => res.data);
    return r;
  }

  async getFilmById(id) {
    const r = await axios
      .get(`/movie/${id}?api_key=${this.KEY}&language=en-US`)
      .then(res => res.data);
    return r;
  }

  async getFilmMassiveById(idMassive) {
    if (idMassive.length === 0) return [];
    let res = idMassive.map(i => this.getFilmById(i));
    res = await Promise.allSettled(res);
    res = res
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);
    return res;
  }

  async getGenres() {
    const g = await axios
      .get(`/genre/movie/list?api_key=${this.KEY}&language=en-US`)
      .then(r => data);
    const genres = g.genres;
    return genres;
  }

  async getTrailer(id) {
    const r = await axios
      .get(`/movie/${id}/videos?api_key=${this.KEY}&language=en-US`)
      .then(r => r.data);
    const trailer = r.results.filter(v => v.name === 'Official Trailer');
    //console.log(trailer[0]);
    return trailer[0];
  }

  async getFilmById(id) {
    const r = await axios
      .get(`/movie/${id}?api_key=${this.KEY}&language=en-US`)
      .then(res => {
        return res.data;
      });
    return r;
  }

  async getFilteredMovies(page) {
    try {
      const searchParams = {
        api_key: this.KEY,
        sort_by: 'popularity.desc',
        page,
        include_adult: false,
        with_genres: this.genre,
        primary_release_year: this.year,
        ['vote_average.gte']: this.vote,
      };
      const res = await axios.get(`discover/movie`, { params: searchParams });
      // console.log('res,', res.data)
      return res.data;
    } catch (error) {
      console.log('err', error);
      return {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: [],
      };
    }
  }
}

export const api = new Api();

// const films = new Api();
// films.getTrendingFilms();
// films.getGenres();
// films.getTreiler();
// films.getFilmById();
// films.getFilmMassiveById();
// films.getFilmBySearch();
