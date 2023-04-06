import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.scss";
import Footer from "../../Footer/Footer";
import NawBar from "../../NawBar/NawBar";

function Courses() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [courses, setCourse] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3100/courses")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка сервера");
                }
                return response.json();
            })
            .then((data) => setCourse(data))
            .catch((error) => console.error("Ошибка:", error));
    }, []);

    return (
        <div>
            <NawBar />
            <div className="course">
                <h1>Курсы</h1>
                {courses.map((object) => (
                    <div className="coursCard" key={object.id}>
                        <p>{object.cours_lvl}</p>
                        <img src={object.img_url} alt="en" />
                        <p>{object.cours_duration}</p>
                        <p>{object.course_price.toLocaleString()} руб.</p>
                        <Link to={``}>Подробнее</Link>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Courses;
