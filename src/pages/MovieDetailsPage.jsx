import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Cast from '../Components/Cast';
import Reviews from '../Components/Reviews';

const KEY = 'b623cf494fc852caec180044c42a9501';

class MovieDetailsPage extends Component {
  state = {
    title: null,
    vote_average: null,
    overview: null,
    genres: [],
    id: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`,
    );
    // this.setState({ movie: response.data });
    this.setState({ ...response.data });
  }

  render() {
    // console.log(this.props.match.url);
    // console.log(this.props.match.params.movieId);
    const { title, vote_average, overview, genres } = this.state;

    const { url, path } = this.props.match;
    return (
      <div>
        <img src="" alt="" />
        <h2>Title: {title}</h2>
        <p>User score: {vote_average}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <p>
          Genres:<span>&nbsp;</span>
          {genres.map(genre => (
            <span key={genre.id}>
              {genre.name}
              <span>,&nbsp;</span>
            </span>
          ))}
        </p>
        <p>Additional information</p>
        {/* <ul className={style.List}> */}
        <ul>
          <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>
        </ul>

        <Route path={`${path}/cast`} component={Cast} />
        <Route path={`${path}/reviews`} component={Reviews} />
      </div>
    );
  }
}

export default MovieDetailsPage;
