import React, { Component } from 'react';
import axios from 'axios';
import Styles from './Reviews.module.scss';

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
  }

  checkReviews = () => {
    if (this.state.reviews.length > 0) {
      return true;
    }
  };

  render() {
    const { reviews } = this.state;
    const doesReviewsLength = this.checkReviews();

    return (
      <ul>
        {!doesReviewsLength ? (
          <div>We don't have any reviews for this movie</div>
        ) : (
          reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p className={Styles.ReviewContent}>{review.content}</p>
            </li>
          ))
        )}
      </ul>
    );
  }
}

export default Reviews;
