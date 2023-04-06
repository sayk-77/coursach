import { React, useEffect } from "react";
import "./Settings.scss";

function ProfileSettings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="ProfileSetings">
      <div className="SetingsWrapper">
        <div className="SetingsTitle">
          <h1>Мой профиль</h1>
          <div className="SetingsSubtitle">
            <a href="">Профиль</a>
            <a href="">Курсы</a>
            <a href="">Настройки</a>
          </div>
        </div>
        <div className="SetingsCard">
          <h2>Основная информация</h2>
          <div className="SetingsCardInfo">
            <div className="SetingsCardLeft">
              <p>Имя</p>
              <p>Фамилия</p>
              <p>Пол</p>
              <p>Телефон</p>
              <p>Дата рождения</p>
            </div>
            <div className="SetingsCardMidle">
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
            <div className="SetingsCardRight">
              <img src="assets/DataUserPhoto.svg" alt="User" />
              <a href="#" className="settingPhoto">
                Загрузить фото
              </a>
            </div>
          </div>
        </div>
        <div className="SettingsDataCard">
          <h2>Данные для входа</h2>
          <div className="SetingsCardDataInfo">
            <div className="SetingsCardDataLeft">
              <p>E-mail</p>
              <p>Логин</p>
              <p>Пароль</p>
            </div>
            <div className="SetingsCardDataMidle">
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
          </div>
        </div>
        <a href="" className="SettingSave">
          Сохранить
        </a>
      </div>
    </div>
  );
}

export default ProfileSettings;
