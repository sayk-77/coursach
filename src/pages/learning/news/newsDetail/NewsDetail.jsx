import React, { useEffect, useState } from "react";
import "./NewsDetail.scss";
import Footer from "../../../Footer/Footer";
import NawBar from "../../../NawBar/NawBar";
import { useParams } from "react-router-dom";

function NewsDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //запрос на получение информации о новости
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState([]);

    useEffect(() => {
        async function fetchNewsDetail() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
            const data = await response.json();
            setNewsDetail(data);
        }
        fetchNewsDetail();
    }, [id]);

    return (
        <div>
            <NawBar />
            <div className="newsOne">
                <div className="newsOneTop">
                    <img
                        className="img_news"
                        src={newsDetail.img_url}
                        alt="newsOne"
                    />
                    <div className="newsOneTopRight">
                        <h1>{newsDetail.title}</h1>
                        <p>{newsDetail.subtitle}</p>
                        <div className="newsOneTime">
                            <img
                                src="https://ltdfoto.ru/images/2023/03/23/time85f6f2540dc1041d.png"
                                alt="time"
                            />
                            <p>
                                {new Date(newsDetail.time).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="newsOneContent">
                    <p>{newsDetail.content}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewsDetail;
