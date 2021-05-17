import React, { Component } from 'react';
import axios from 'axios';
import './Cast.scss';
import imgDefault from './no-user-image-icon-27.jpg';
import { useHistory } from 'react-router-dom';

const imgURL = 'https://image.tmdb.org/t/p/w200';
const KEY = 'b623cf494fc852caec180044c42a9501';

class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
    );
    this.setState({ actors: response.data.cast });
  }

  render() {
    
    //
    const { actors } = this.state;

    console.log('Cast location', this.props.location);

    return (
      <ul className="Cast-list">
        {actors.map(actor => (
          <li className="Cast-listItem" key={actor.id}>
            <div className="Cast-cardContainer">
              <div className="Cast-thumb">
                <img
                  src={
                    actor.profile_path
                      ? `${imgURL}${actor.profile_path}`
                      : imgDefault
                  }
                  alt={actor.name}
                />
              </div>
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cast;
