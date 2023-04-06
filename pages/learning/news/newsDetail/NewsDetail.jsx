import React, {useEffect} from "react";
import "./NewsDetail.scss";
import Footer from '../../../Footer/Footer';
import NawBar from "../../../NawBar/NawBar";

function NewsDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NawBar />
      <div className="newsOne">
        <div className="newsOneTop">
        <img src="https://i.ibb.co/N9fnGXD/newsOne.png" alt="newsOne" border="0" />
          <div className="newsOneTopRight">
            <h1></h1>
            <p>
            </p>
            <div className="newsOneTime">
              <img src="https://ltdfoto.ru/images/2023/03/23/time85f6f2540dc1041d.png" alt="time" />
              <p>3 марта 2023</p>
            </div>
          </div>
        </div>
        <div className="newsOneContent">
          <p>
            Запишитесь на курсы уже сейчас и начните изучать новый язык в
            комфортной и дружелюбной атмосфере! Для записи и получения
            дополнительной информации обращайтесь в наш офис или по телефону.
          </p>
          <p>Спешите, количество мест ограничено!</p>
          <p>
            Кроме того, наша школа предлагает разнообразные программы для всех
            уровней языкового владения, от начинающих до продвинутых. Мы поможем
            вам не только с изучением языка, но и подготовим к международным
            экзаменам, таким как TOEFL, DELF, и DELE.
          </p>
          <p>
            Также, наши студенты могут принимать участие в интересных
            мероприятиях и языковых клубах, где вы сможете практиковать свой
            язык в реальной жизни и общаться с носителями языка.
          </p>
          <p>
            Мы уверены, что изучение иностранного языка - это ключ к новым
            возможностям и культурному обогащению. Поэтому, не упустите шанс
            стать частью нашей языковой семьи и начать свой путь к свободному
            общению на английском, французском или испанском языках!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsDetail;
