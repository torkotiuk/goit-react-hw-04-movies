import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
const KEY = 'b623cf494fc852caec180044c42a9501';

class Homepage extends Component {
  state = { moviesPopular: [] };

  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc`,
    );

    this.setState({ moviesPopular: response.data.results });
  }

  render() {
    const { moviesPopular } = this.state;
    //in this page '/' = this.props.match.url
    // console.log(this.props.match.url);
    return (
      <div>
        <h1>Home page</h1>

        <ul>
          {moviesPopular.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
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

export default Homepage;
