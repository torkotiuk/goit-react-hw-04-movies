import React, { Component } from 'react';
import axios from 'axios';
import NotFoundPage from '../../pages/NotFoundPage';
import { Route, Link } from 'react-router-dom';

const KEY = 'b623cf494fc852caec180044c42a9501';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
    );

    this.setState({ reviews: response.data.results });
    // console.log(response.data.results);
  }

  render() {
    const { reviews } = this.state;

    return (
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <div>We don't have any reviews for this movie</div>
        )}
      </ul>
    );
  }
}
{
  /* <div>We don't have any reviews for this movie</div> */
}

export default Reviews;
