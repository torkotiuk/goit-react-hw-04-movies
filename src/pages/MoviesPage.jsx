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

  //input change
  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  //submit form
  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    axios
      .get(
        `/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
      )
      .then(response => {
        this.setState({ movies: response.data.results });
      });

    this.setState({ query: '' });
  };

  render() {
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
              {/* next code work */}
              {/* <Link to={`/movies/${movie.id}`}>{movie.title}</Link> */}
              {/* whay doesn't work next code????????????? */}
              {/* <Link to={`${this.props.match.url}/${movie.id}`}>
      {movie.title}
    </Link> */}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
