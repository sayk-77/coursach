import React, { useEffect, useState } from "react";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";
import "./news.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function NewsAdmin() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://fwxds.localto.net/news');

                if(!response.ok) {
                    console.log("Ошибка сервера");
                }

                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNews();
    }, [])

    const deleteNews = async (id) => {
        try {
            const response = await fetch(`https://fwxds.localto.net/news/delete/${id}`, {
                method: "DELETE"
            });
    
            if (!response.ok) {
                console.log("Ошибка сервера");
            } else {
                const updatedNews = news.filter((news) => news.id !== id);
                setNews(updatedNews);
                toast.success('Новость успешно удалена');
            }
        } catch (error) {
            console.log("Ошибка:", error);
        }
    }
    

    return(
        <div className="admin-news">
            <NawBarAdmin />
            <div className="content">
                <div className="titile">
                    <h2>Количество Новостей: <span>{news.length}</span></h2>
                    <div className="admin-setting">
                        <Link to="/panel/admin/news/add">
                            <img src="https://ltdfoto.ru/images/2023/05/03/Group.png" alt="add" />
                        </Link>
                    </div>
                </div>
                {news.map((news) => (
                    <div className="content-container" key={news.id}>
                        <div className="new">
                            <img src={news.img_url} alt="image" width="300px" height="227px"/>
                            <div className="new-content">
                                <h3 className="new-title">{news.title}</h3>
                                <p className="text">{news.subtitle}</p>
                                <div className="new-bottom">
                                <Link to={`/panel/admin/news/detail/${news.id}`}>Подробнее</Link>
                                    <div className="time">
                                        <img src="https://ltdfoto.ru/images/2023/03/23/time85f6f2540dc1041d.png" alt="time" />
                                        <p>{new Date(news.time).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img
                            className="delete"
                            src="https://ltdfoto.ru/images/2023/05/03/Group-174.png"
                            alt="delete"
                            onClick={() => deleteNews(news.id)}
                        />
                    </div>
                ))}
            </div>
            
        </div>
    );
}


export default NewsAdmin;