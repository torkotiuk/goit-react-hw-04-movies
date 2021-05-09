import { Component, Suspense, lazy } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
// import Cast from '../Components/Cast';
// import Reviews from '../Components/Reviews';
import routes from '../routes';

const Cast = lazy(() =>
  import('../Components/Cast' /* webpackChunkName: "cast-component" */),
);

const Reviews = lazy(() =>
  import('../Components/Reviews' /* webpackChunkName: "reviews-component" */),
);

const imgURL = 'https://image.tmdb.org/t/p/w200';

const KEY = 'b623cf494fc852caec180044c42a9501';

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
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`,
    );
    // this.setState({ movie: response.data });
    console.log('>..>>', response.data);
    this.setState({ ...response.data });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    //v.1
    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }
    // history.push(routes.home);

    //v.2 (2020 with operator ?.)
    history.push(location?.state?.from || routes.movies);
  };

  render() {
    // console.log(this.props.match.url);
    // console.log(this.props.match.params.movieId);
    const { poster_path, title, vote_average, overview, genres } = this.state;
    const { url, path } = this.props.match;

    return (
      <div>
        {/* my decision */}
        {/* <button
          type="button"
          onClick={() => this.props.history.push(routes.home)}
        > */}
        {/* good decision!!!! */}
        <button type="button" onClick={this.handleGoBack}>
          <span role="img" aria-label="face emoji">
            ⏪
          </span>
          Back
        </button>
        <img src={`${imgURL}${poster_path}`} alt="" />
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
            <Link
              to={{
                pathname: `${url}/cast`,
                state: {
                  x: 5,
                },
              }}
            >
              Cast
            </Link>
          </li>
          {/* <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li> */}
          <li>
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
