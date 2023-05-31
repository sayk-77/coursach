import React,{ useEffect, useState } from "react";
import "./Courses.scss";
import NawBar from "../../NawBar/NawBar";
import NawProfile from "../../NawBar/ProfileNawBar/NawProfile";
import jwtDecode from "jwt-decode";

function ProfileCourses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [courses, setCourses] = useState([]);

  const user_id = jwtDecode(localStorage.getItem("token")).id;

  useEffect(() => {
    const profileCourse = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profileCourse`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });
        if (!response.ok) {
          alert("Ошибка");
        }
        const data = await response.json();
        setCourses(data);
        console.log(data);
      } catch (error) {
        alert(error);
      }
    };
    profileCourse();
  }, []);
  return (
    <div className="ProfileCourses">
      <NawBar />
      <div className="CoursesWrapper">
        <NawProfile />
        <div className="CoursesContent">
          <div className="CoursesContentTitle">
            <h2>Курс</h2>
            <h2>Язык</h2>
            <h2>Срок</h2>
            <h2>Стоимость</h2>
          </div>
          {courses.map((course) => (
            <div className="CoursesContentCard" key={course.id}>
              <p>{course.cours_lvl}</p>
              <img src={course.language_url} alt="img" />
              <p id="term">{course.cours_duration}</p>
              <p id="price">{course.course_price}</p>
            </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCourses;
