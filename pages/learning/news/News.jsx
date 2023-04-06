import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./News.scss";
import Footer from "../../Footer/Footer";
import NawBar from "../../NawBar/NawBar";

function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // клиентская часть для получения json обьекта и его рендер
  const [news, setNews] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3100/news')
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка сервера');
          }
          return response.json();
        })
        .then(data => setNews(data))
        .catch(error => console.error('Ошибка:', error));
  }, []);

  return (
    <div>
      <NawBar />
      <div className="contentNews">
        {news.map(object => (
          <div className="newsCard" key={object.id}>
            <img src={object.img_url} alt="image" />
            <div className="newsCardRight">
              <h3>{object.title}</h3>
              <p>{object.subtitle}</p>
              <div className="newsCardRigthBottom">
                  <Link to='/newsDetail'>Подробнее</Link>
                <div className="newsCardTime">
                  <img src="https://ltdfoto.ru/images/2023/03/23/time85f6f2540dc1041d.png" alt="time" />
                  <p>{new Date(object.time).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="newsBtnNav">
          <Link className="aActive" href="">
            1
          </Link>
          <Link href="">2</Link>
          <Link href="">3</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default News;
