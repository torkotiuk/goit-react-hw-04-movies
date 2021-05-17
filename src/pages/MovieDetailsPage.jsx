import { Component, Suspense, lazy } from 'react';
import { Route, Link } from 'react-router-dom';
import routes from '../routes';

import Styles from './Pages.module.scss';
import MoviePreview from '../Components/MoviePreview/MoviePreview';

const Cast = lazy(() =>
  import('../Components/Cast' /* webpackChunkName: "cast-component" */),
);

const Reviews = lazy(() =>
  import('../Components/Reviews' /* webpackChunkName: "reviews-component" */),
);

class MovieDetailsPage extends Component {
  handleGoBack = () => {
    const { location, history } = this.props;
    // console.log('handleGoBack before push', location.state);
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    history.push(routes.home);
  };

  render() {
    const { url, path } = this.props.match;
    const { movieId } = this.props.match.params;
    
    return (
      <div>
        <div className={Styles.MoviesDetailCont}>
          <button
            className={Styles.MovieBtnBack}
            type="button"
            onClick={this.handleGoBack}
          >
            <span role="img" aria-label="face emoji">
              ⏪
            </span>
            Back
          </button>

          <MoviePreview movieId={movieId} />
        </div>

        <p className={Styles.MovieCardInfoCont}>
          Additional information <span>about movie (id: {movieId})</span>
        </p>
        <ul>
          <li className={Styles.MovieCardInfo_Item}>
            {/* <Link to={`${url}/cast`}>Cast</Link> */}

            <Link
              to={{
                pathname: `${url}/cast`,
                state: { from: this.props.location.state.from },
              }}
            >
              Cast
            </Link>
          </li>
          <li className={Styles.MovieCardInfo_Item}>
            {/* <Link to={`${url}/reviews`}>Reviews</Link> */}
            <Link
              to={{
                pathname: `${url}/reviews`,
                state: { from: this.props.location.state.from },
              }}
            >
              Reviews
            </Link>
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
