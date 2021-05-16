import { Component } from 'react';
import axios from 'axios';
import Styles from './MoviePreview.module.scss';
import imgDefault from './no-movie.png';

const imgURL = 'https://image.tmdb.org/t/p/w200';
const KEY = 'b623cf494fc852caec180044c42a9501';
axios.defaults.baseURL = 'https://api.themoviedb.org';

class MoviePreview extends Component {
  state = {
    poster_path: null,
    title: null,
    vote_average: null,
    overview: null,
    genres: [],
    id: null,
  };

  async componentDidMount() {
    const { movieId } = this.props;
    const response = await axios.get(
      `/3/movie/${movieId}?api_key=${KEY}&language=en-US`,
    );

    this.setState({ ...response.data });
  }

  render() {
    const { poster_path, title, vote_average, overview, genres } = this.state;

    return (
      <div>
        <>
          <div className={Styles.MovieImgThumb}>
            <img
              src={poster_path ? `${imgURL}${poster_path}` : imgDefault}
              alt={title}
            />

            {/* actor.profile_path
                      ? `${imgURL}${actor.profile_path}`
                      : imgDefault */}
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
        </>
      </div>
    );
  }
}

export default MoviePreview;
