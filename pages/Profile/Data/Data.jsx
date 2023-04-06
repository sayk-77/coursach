import { React, useEffect } from "react";
import "./Data.scss";

function ProfileData() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ProfileData">
      <div className="DataWrapper">
        <div className="DataTitle">
          <h1>Мой профиль</h1>
          <div className="DataSubtitle">
            <a href="">Профиль</a>
            <a href="">Курсы</a>
            <a href="">Настройки</a>
          </div>
        </div>
        <div className="DataCard">
          <h2>Основная информация</h2>
          <div className="DataCardInfo">
            <div className="DataCardLeft">
              <p>Имя</p>
              <p>Фамилия</p>
              <p>Пол</p>
              <p>Телефон</p>
              <p>Дата рождения</p>
            </div>
            <div className="DataCardMidle">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className="DataCardRight">
              <img src="assets/DataUserPhoto.svg" alt="User" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
