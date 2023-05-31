import React , { useRef } from "react";
import './reviews-create.scss';

function ReviewsCreate() {
    const textareaRef = useRef(null);
    const textareaSize = () => {
        const textarea = textareaRef.current;
        textarea.style.height = '100px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return(
        <div className="reviews__form__content">
            <div className="reviews__form__content-rating">
                <p>Оставьте свой отзыв!</p>
                <div class="rating-area">
                    <input type="radio" id="star-5" name="rating" value="5" />
                    <label for="star-5" title="Оценка «5»"></label>	
                    <input type="radio" id="star-4" name="rating" value="4" />
                    <label for="star-4" title="Оценка «4»"></label>    
                    <input type="radio" id="star-3" name="rating" value="3" />
                    <label for="star-3" title="Оценка «3»"></label>  
                    <input type="radio" id="star-2" name="rating" value="2" />
                    <label for="star-2" title="Оценка «2»"></label>    
                    <input type="radio" id="star-1" name="rating" value="1" />
                    <label for="star-1" title="Оценка «1»"></label>
                </div>
            </div>
            <form>
                <textarea type="text" name='comentary' ref={textareaRef} onChange={textareaSize} />
                <input type="submit" />
            </form>
        </div>
    );
}


export default ReviewsCreate;