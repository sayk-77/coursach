import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import "./Data.scss";
import NawBar from "../../NawBar/NawBar";
import NawProfile from "../../NawBar/ProfileNawBar/NawProfile";
import jwtDecode from "jwt-decode";

function ProfileData() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    console.log(data);
  }, [])
  return (
      <div className="ProfileData">
        <NawBar />
        <div className="DataWrapper">
          <NawProfile />
          <div className="DataCard">
            <div className="DataCardHeader">
              <h2>Основная информация</h2>
              <Link to="/settings">
                <img src="https://ltdfoto.ru/images/2023/04/24/settings.png" alt="settings"/>
              </Link>
            </div>
            <div className="DataCardInfo">
              <div className="DataCardLeft">
                <p>Имя</p>
                <p>Фамилия</p>
                <p>Пол</p>
                <p>Телефон</p>
                <p>Дата рождения</p>
              </div>
              {data.personal_data ? (
                <div className="DataCardMidle">
                  <p>{data.personal_data.first_name}</p>
                  <p>{data.personal_data.last_name}</p>
                  <p>{data.personal_data.gender}</p>
                  <p>{data.personal_data.phone}</p>
                  <p>{new Date(data.personal_data.birth_date).toLocaleDateString()}</p>
                </div>
              ) : (<p></p>)}
              {data.personal_data ? ( 
                <div className="DataCardRight" id="save">
                  <img src={`${data.personal_data.user_img}`} alt="User" />
                </div>
                  ) : (<p></p>)}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfileData;
