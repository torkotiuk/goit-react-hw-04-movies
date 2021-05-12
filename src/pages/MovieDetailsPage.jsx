import { Component, Suspense, lazy } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes';
import Styles from './Pages.module.scss';

const Cast = lazy(() =>
  import('../Components/Cast' /* webpackChunkName: "cast-component" */),
);

const Reviews = lazy(() =>
  import('../Components/Reviews' /* webpackChunkName: "reviews-component" */),
);

const imgURL = 'https://image.tmdb.org/t/p/w200';
const KEY = 'b623cf494fc852caec180044c42a9501';

axios.defaults.baseURL = 'https://api.themoviedb.org';

class MovieDetailsPage extends Component {
  state = {
    poster_path: null,
    title: null,
    vote_average: null,
    overview: null,
    genres: [],
    id: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await axios.get(
      `/3/movie/${movieId}?api_key=${KEY}&language=en-US`,
    );

    this.setState({ ...response.data });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
  };

  render() {
    const { poster_path, title, vote_average, overview, genres } = this.state;
    const { url, path } = this.props.match;

    return (
      <div>
        <div className={Styles.MoviesDetailCont}>
          <button type="button" onClick={this.handleGoBack}>
            <span role="img" aria-label="face emoji">
              ⏪
            </span>
            Back
          </button>
          <div className={Styles.MovieImgThumb}>
            <img src={`${imgURL}${poster_path}`} alt={title} />
          </div>
          <h2 className={Styles.MovieCardItem}>Title: {title}</h2>
          <p className={Styles.MovieCardItem}>User score: {vote_average}</p>
          <h3 className={Styles.MovieCardOverview}>Overview</h3>
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
        </div>
        <p className={Styles.MovieCardInfoCont}>Additional information</p>
        <ul>
          <li className={Styles.MovieCardInfo_Item}>
            <Link to={{ pathname: `${url}/cast` }}>Cast</Link>
          </li>
          <li className={Styles.MovieCardInfo_Item}>
            <Link to={`${url}/reviews`}>Reviews</Link>
            <span role="img" aria-label="face emoji">
              💨
            </span>
          </li>
        </ul>

        <Suspense fallback={<h1>Loading...</h1>}>
          <Route path={`${path}/cast`} component={Cast} />
          <Route path={`${path}/reviews`} component={Reviews} />
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;
