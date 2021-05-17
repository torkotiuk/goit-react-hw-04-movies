import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import Styles from './Pages.module.scss';

const KEY = 'b623cf494fc852caec180044c42a9501';
axios.defaults.baseURL = 'https://api.themoviedb.org';

class Homepage extends Component {
  state = { moviesPopular: [] };

  async componentDidMount() {
    const response = await axios.get(`/3/trending/all/day?api_key=${KEY}`);
    this.setState({ moviesPopular: response.data.results });
  }

  render() {
    const { moviesPopular } = this.state;

    return (
      <div>
        <h1 className={Styles.Title}>Trending movies</h1>

        <ul>
          {moviesPopular.map(movie => (
            <li className={Styles.HomeItem} key={movie.id}>
              <NavLink
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: this.props.location },
                }}
              >
                {movie.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(Homepage);
