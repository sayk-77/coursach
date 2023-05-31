import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./News.scss";
import Footer from "../../Footer/Footer";
import NawBar from "../../NawBar/NawBar";

function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPage, setNewsPage] = useState(3);

  const limitation = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const currentNews = limitation(news, newsPage, currentPage);



    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/news`);
                if (!response.ok) {
                    alert("Ошибка");
                }
                const data = await response.json();
                setNews(data);
            } catch (error) {
                alert(error);
            }
        }
        fetchNews();
    }, []);


    return (
    <div>
      <NawBar />
      <div className="contentNews">
        {currentNews.map((object) => (
          <div className="newsCard" key={object.id}>
            <img className="img_news" src={object.img_url} alt="image" />
            <div className="newsCardRight">
              <h3>{object.title}</h3>
              <p>{object.subtitle}</p>
              <div className="newsCardRigthBottom">
              <Link to={`/news/${object.id}?page=${currentPage}`}>Подробнее</Link>
                <div className="newsCardTime">
                  <img
                    src="https://ltdfoto.ru/images/2023/03/23/time85f6f2540dc1041d.png"
                    alt="time"
                  />
                  <p>{new Date(object.time).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="newsBtnNav">
          {Array.from({ length: Math.ceil(news.length / newsPage)}, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "aActive" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default News;
