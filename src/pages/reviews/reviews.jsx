import React, { useEffect, useState } from "react";
import "./reviews.scss";

function Reviews({ course_id }) {
  const renderStars = (value) => {
    const stars = [];

    for (let i = 0; i < value; i++) {
      stars.push(<span key={i} className="active"></span>);
    }

    for (let i = value; i < 5; i++) {
      stars.push(<span key={i}></span>);
    }

    return stars;
  };
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function showReviews() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/showReviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setReviews(data);
        return;
      }
    }
    showReviews();
  }, []);

  return (
    <div className="reviews">
      {reviews.length === 0 ? (
        <p className="reviewNot">Нет отзывов</p>
      ) : (
        reviews.map((review) => (
          <div className="reviews__content" key={review.id}>
            <div className="reviews__content-review">
              <div className="reviews__content-review-content">
                <div className="reviews__content-rewiews-content-rating">
                  <img src={review.user_img} alt="avatar" />
                  <p className="userName">{review.first_name}</p>
                  <div className="rating-mini">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p>{review.review_text}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Reviews;
