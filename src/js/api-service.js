import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export class Api {
  constructor() {
    this.KEY = 'c23d7755b502540a74ef819e02a6a593';
    this.page = 1;
    this.query = '';
  }

  async getTrendingFilms() {
    const r = await axios
      .get(
        `/trending/movie/week?api_key=${this.KEY}&language=en-US&page=${this.page}`
      )
      .then(res => res.data);

    console.log(r.results);
    return r.results;
  }

  async getFilmBySearch() {
    const r = await axios.get(
      `/search/movie?api_key=${this.KEY}&query=${this.query}&language=en-US&${this.page}`
    );
  }
  getNextPage() {
    let nextPagfe = this.page + 1;
    return nextPage;
  }
}

const films = new Api();
films.getTrendingFilms();