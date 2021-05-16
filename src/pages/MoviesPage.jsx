import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const KEY = 'b623cf494fc852caec180044c42a9501';
axios.defaults.baseURL = 'https://api.themoviedb.org';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.searchQuery) {
      this.setState({ query: this.props.location.state.searchQuery });

      const query = this.props.location.state.searchQuery;
      axios
        .get(`/3/search/movie?api_key=${KEY}&query=${query}`)
        .then(response => {
          this.setState({ movies: response.data.results });
        });
    }
  }

  //input change
  handleChange = e => {
    this.setState({ query: e.currentTarget.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchMovies();
    //
    // console.log(this.state.query);
    this.setHistory();
    //
    this.setState({ query: '' });
  };

  setHistory = () => {
    const { query } = this.state;
    this.props.history.push({
      // pathname: this.props.location.pathname,
      search: `query=${query}`,
      state: { searchQuery: `${query}` },
    });
  };

  searchMovies = () => {
    const { query } = this.state;
    return axios
      .get(`/3/search/movie?api_key=${KEY}&query=${query}`)
      .then(response => {
        this.setState({ movies: response.data.results });
      });
  };

  render() {
    console.log('MoviesPage > location.search', this.props.location.search);
    // console.log('MoviesPage > match', this.props.match);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Search</button>
        </form>

        <ul>
          {this.state.movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: this.props.location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
