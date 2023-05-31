import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.scss";
import Footer from "../../Footer/Footer";
import NawBar from "../../NawBar/NawBar";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

function Courses() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [courses, setCourse] = useState([]);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/courses`, {
                        headers: {
                            "ngrok-skip-browser-warning" : 1
                        }
                    }
                );

                if (!response.ok) {
                    toast.error("Ошибка сервера");
                }

                const data = await response.json();
                setCourse(data);
            } catch (error) {
                toast.error("Ошибка:", error);
            }
        }
        fetchCourse();
    }, []);

    let token;
    let decodeToken;
    // добавить курс для пользователя
    const addCourseToProfile = async (course_id) => {
        localStorage.getItem("token")
            ? (token = localStorage.getItem("token"))
            : toast.info("Требуется авторизация");
        if (!token) {
            return;
        }

        jwtDecode(token).exp > Date.now() / 1000
            ? (decodeToken = jwtDecode(token))
            : toast.info("Срок авторизации истек");
        if (!decodeToken) {
            return;
        }

        const user_id = decodeToken.id;

        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/addCourse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ course_id, user_id }),
            });
            const data = await result.json();
            if (result.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div>
            <NawBar />
            <div className="course">
                <h1>Курсы</h1>
                {courses.map((object) => (
                    <Link to={`/courses/${object.id}`}>
                        <div className="coursCard" key={object.id}>
                            <p>{object.cours_lvl}</p>
                            <img src={object.language_url} alt="en" style={{width: '150px', height: '90px'}}/>
                            <p>{object.cours_duration}</p>
                            <p>{object.course_price} руб.</p>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    addCourseToProfile(object.id);
                                }}
                            >
                                Купить
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Courses;
