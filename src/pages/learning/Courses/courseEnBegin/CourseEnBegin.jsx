import {React, useEffect, useState, useRef} from "react";
import './CourseEnBegin.scss';
import Footer from '../../../Footer/Footer';
import NawBar from "../../../NawBar/NawBar";
import {useParams} from "react-router-dom";
import ReviewsCreate from "../../../reviews/reviews-create";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import Reviews from "../../../reviews/reviews";


function CourseEnBegin() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    //получение данных о курсах
    const { id } = useParams();
    const [coursDetail, setCoursDetail] = useState({});

    useEffect(() => {
        async function fetchCoursDetail() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
            const data = await response.json();
            setCoursDetail(data);
        }
        fetchCoursDetail();
    }, [id]);

    // для отзывов
    const textareaPage = useRef(null);
    const textareaSize = () => {
        const textarea = textareaPage.current;
        textarea.style.height = '100px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
    const [rating, setRating] = useState(0);


    let user_img; // аватар пользователя
    let user_id; // id пользователя

    const tokenExp = Date.now() / 1000;

    const saveReview = async (event) => {
        event.preventDefault();

        // проверка на авторизацию
        const token = localStorage.getItem('token');
        if(!token || jwtDecode(token).exp < tokenExp) {
            toast.info('Необходимо войти в свой профиль');
            return;
        } else {
            user_id = jwtDecode(token).id;
            user_img = jwtDecode(token).user_img;
        }
 
        const reviewText = textareaPage.current.value;

        // валидация полей
        if (!reviewText || !rating) {
            toast.info('Необходимо заполнить все поля!');
            return;
        }

        // проверка на авторизацию
        try {
            const data = {
            course_id: id,
            user_id: user_id,
            rating: rating,
            reviewText: reviewText
        };

        console.log(data);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/addReview`, {
            method: 'POST',
            headers: {'Content-Type':  'application/json' },
            body: JSON.stringify(data),
        });

        const dataReview = await response.json();

        if(response.ok) {
            toast.success(dataReview.message);
            
        } else {
            toast.error('Произошла ошибка');
        } 
        } catch (error) {
            console.log('Ошибка' + error);
        }
    }


    return(
        <div>
            <NawBar />
            <div className="CourseEnBegin">
                <p className="courseInfo">О курсе</p>
                <p className="contentText">{coursDetail.title}</p>
                <div className="contentList">
                    <h3>Что входит в курс:</h3>
                    <p>{coursDetail.included}</p>
                </div>
                <div className="contentList">
                    <h3>Дополнительно:</h3>
                    <p>{coursDetail.additionally}</p>
                </div>
            </div>
            <div className="reviews__form__content">
                <form onSubmit={saveReview}>
                    <div className="reviews__form__content-rating">
                        <p>Оставьте свой отзыв!</p>
                        <div className="rating-area">
                            <input type="radio" id="star-5" name="rating" value="5" onChange={() => setRating(5)} />
                            <label htmlFor="star-5" title="Оценка «5»"></label>
                            <input type="radio" id="star-4" name="rating" value="4" onChange={() => setRating(4)} />
                            <label htmlFor="star-4" title="Оценка «4»"></label>
                            <input type="radio" id="star-3" name="rating" value="3" onChange={() => setRating(3)} />
                            <label htmlFor="star-3" title="Оценка «3»"></label>
                            <input type="radio" id="star-2" name="rating" value="2" onChange={() => setRating(2)} />
                            <label htmlFor="star-2" title="Оценка «2»"></label>
                            <input type="radio" id="star-1" name="rating" value="1" onChange={() => setRating(1)} />
                            <label htmlFor="star-1" title="Оценка «1»"></label>
                        </div>
                    </div>
                    <textarea
                    type="text"
                    name="commentary"
                    ref={textareaPage}
                    onChange={textareaSize}
                    />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
            <Reviews course_id={id} user_img={user_img}/>
            <Footer />
        </div>
    );
}

export default CourseEnBegin;