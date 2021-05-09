import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
const KEY = 'b623cf494fc852caec180044c42a9501';
axios.defaults.baseURL = 'https://api.themoviedb.org';

class Homepage extends Component {
  state = { moviesPopular: [] };

  async componentDidMount() {
    const response = await axios.get(
      `/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc`,
    );

    this.setState({ moviesPopular: response.data.results });
  }

  render() {
    const { moviesPopular } = this.state;
    //in this page '/' = this.props.match.url
    // console.log(this.props.match.url);

    // console.log(this.props.location);
    return (
      <div>
        <h1>Home page</h1>

        <ul>
          {moviesPopular.map(movie => (
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
      </div>
    );
  }
}

export default withRouter(Homepage);
