import React, { Component } from 'react';
import axios from 'axios';

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

    // this.setState({ ...response.data.cast });
    this.setState({ actors: response.data.cast });
  }

  render() {
    const { actors } = this.state;
    return (
      <ul>
        {actors.map(actor => (
          <li key={actor.id}>
            <img src={actor.profile_path} alt={actor.name} />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cast;
