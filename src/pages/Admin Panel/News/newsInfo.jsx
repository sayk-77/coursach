import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";

function NewsInfo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //запрос на получение информации о новости
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState({});

  useEffect(() => {
    async function fetchNewsDetail() {
      const response = await fetch(`https://fwxds.localto.net/news/${id}`);
      const data = await response.json();
      setNewsDetail(data);
    }
    fetchNewsDetail();
  }, [id]);

  return (
    <div>
      <NawBarAdmin />
      <div className="newsOne">
        <div className="newsOneTop">
        <img className="img_news" src={newsDetail.img_url} alt="newsOne" border="0" />
          <div className="newsOneTopRight">
            <h1>{newsDetail.title}</h1>
            <p>{newsDetail.subtitle}</p>
            <div className="newsOneTime">
              <img src="https://ltdfoto.ru/images/2023/03/23/time85f6f2540dc1041d.png" alt="time" />
              <p>{new Date(newsDetail.time).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="newsOneContent">
          <p>{newsDetail.content}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsInfo;
