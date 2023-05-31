import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";
import "./course.scss";
import { Link } from "react-router-dom";

function Course() {

    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch("https://fwxds.localto.net/courses");
          
              if (!response.ok) {
                console.log("Ошибка сервера");
              }
              
              const data = await response.json();
              setCourse(data);
            } catch (error) {
                console.log("Ошибка:", error);
            }
          }
          fetchCourse();
    }, [])

    const deleteCourse = async (id) => {
        try {
            const response = await fetch(`https://fwxds.localto.net/courses/delete/${id}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                console.log("Ошибка сервера");
            } else {
                const updatedCourses = course.filter((course) => course.id !== id);
                setCourse(updatedCourses);
                toast.success('Курс успешно удален');
            }
        } catch (error) {
            console.log("Ошибка:", error);
        }
    }

    

    return(
        <div className="course-admin">
            <NawBarAdmin />
            <div className="content">
                <div className="title">
                    <h2>Количество курсов: <span>{course.length}</span></h2>
                    <Link to='/panel/admin/course/add'>
                        <img src="https://ltdfoto.ru/images/2023/05/03/Group.png" alt="add" />
                    </Link>
                </div>
                {course.sort((a, b) => a.id - b.id).map((course) => (
                    <div className="content-container" key={course.id}>
                        <div className="cours">
                            <p>{course.id}</p>
                            <p>{course.cours_lvl}</p>
                            <img src={course.language_url} alt="lang" width="100px" height="60px"/>
                            <p>{course.cours_duration}</p>
                            <p>{course.course_price}</p>
                            <Link to={`/panel/admin/course/detail/${course.id}`}>Подробнее</Link>
                        </div>
                        <img
                            className="delete"
                            src="https://ltdfoto.ru/images/2023/05/03/Group-174.png"
                            alt="delete"
                            onClick={() => deleteCourse(course.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Course;