import React, { useState, useEffect } from "react";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";
import { toast } from "react-toastify";

function ReviewsAdmin() {
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
            const response = await fetch("https://fwxds.localto.net/fetchReviews",
                {
                    method: "POST",
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setReviews(data);
                return;
            }
        }
        showReviews();
    }, []);

    const deleteReview = async (id) => {
        try {
            const response = await fetch(
                `https://fwxds.localto.net/reviews/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                console.log("Ошибка сервера");
            } else {
                const updatedReviews = reviews.filter(
                    (reviews) => reviews.id !== id
                );
                setReviews(updatedReviews);
                toast.success("Коментарий удален");
            }
        } catch (error) {
            console.log("Ошибка:", error);
        }
    };

    return (
        <div className="reviews">
            <NawBarAdmin />
            <p className="countReviews">Все отзывы к курсам</p>
            {reviews.length === 0 ? (
                <p className="reviewNot">Нет отзывов</p>
            ) : (
                reviews.map((review) => (
                    <div className="reviews__content" key={review.id}>
                        <div className="reviews__content-review">
                            <div className="review__content-title">
                                <p>
                                    Уровень подготовки: <span>{review.cours_lvl}</span>
                                </p>
                                <div className="course_lang">
                                    <p>Язык:</p>
                                    <img src={review.language_url} />
                                </div>
                            </div>
                            <div className="reviews__content-review-content">
                                <div className="reviews__content-rewiews-content-rating">
                                    <img src={review.user_img} alt="avatar" />
                                    <p className="userName">
                                        {review.first_name}
                                    </p>
                                    <div className="rating-mini">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <p style={{ wordWrap: "break-word" }}>
                                    {review.review_text}
                                </p>
                            </div>
                            <img
                                onClick={() => deleteReview(review.id)}
                                src="https://ltdfoto.ru/images/2023/05/03/Group-174.png"
                                alt="delete"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    marginLeft: "95%",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ReviewsAdmin;
