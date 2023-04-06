import { React, useEffect } from "react";
import "./Courses.scss";

function ProfileCourses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ProfileCourses">
      <div className="CoursesWrapper">
        <div className="CoursesTitle">
          <h1>Мой профиль</h1>
          <div className="CoursesSubtitle">
            <a href="">Профиль</a>
            <a href="">Курсы</a>
            <a href="">Настройки</a>
          </div>
          <div className="CoursesContent">
            <div className="CoursesContentTitle">
              <h2>Курс</h2>
              <h2>Язык</h2>
              <h2>Срок</h2>
              <h2>Стоимость</h2>
            </div>
            <div className="CoursesContentCard">
              <p>Подготовка к экзамену</p>
              <img src="assets/coursImgIdeu.png" alt="deu" />
              <p id="term">3 недели</p>
              <p id="price">14 000 руб.</p>
            </div>
            <div className="CoursesContentCard">
              <p>Начинающий уровень</p>
              <img src="assets/coursImgItal.png" alt="italy" />
              <p id="term">5 недель</p>
              <p id="price">23 000 руб.</p>
            </div>
            <div className="CoursesContentCard">
              <p>Продвинутый уровень </p>
              <img src="assets/coursImgen.png" alt="en" />
              <p id="term">6 недель</p>
              <p id="price">31 000 руб.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCourses;
