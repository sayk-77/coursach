import React, {useEffect} from "react";
import './Contacts.scss';
import Footer from "../Footer/Footer";
import NawBar from "../NawBar/NawBar";
import MapYandex from "../../module/Map";


function Contacts() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <div>
        <NawBar />
        <div className="contackContent">
            <div className="contactLeft">
              <h3>Телефон</h3>
              <div className="telephone">
                <div className="telephoneCard">
                  <img src="assets/telephone.svg" alt="telephone" />
                  <p>+7 (777) 342-23-42</p>
                </div>
                <div className="telephoneCard">
                  <img src="assets/telephone.svg" alt="telephone" />
                  <p>+7 (432) 583-58-29</p>
                </div>
              </div>
              <h3>Электронная почта</h3>
              <div className="email">
                <img src="assets/email.svg" alt="email" />
                <p>enschool@school.ru</p>
              </div>
              <h3>Адрес</h3>
              <div className="adress">
                <img src="assets/location.svg" alt="location" />
                <p>Великий Новгород, ул. Псковская, д.34</p>
              </div>
              <h3>Социальные сети</h3>
              <div className="contactSocial">
                <a href="https://vk.com" target="_blank"><img src="https://i.ibb.co/48br7NX/image-12.png" alt="image-12" border="0" /></a>
                <a href="https://www.instagram.com/" target="_blank"><img src="https://i.ibb.co/h8nF3FG/image-13.png" alt="image-13" border="0" /></a>
                <a href="https://web.telegram.org/k/" target="_blank"><img src="https://i.ibb.co/mDzH9VP/image-12-1.png" alt="image-12-1" border="0" /></a>
                <a href="https://www.whatsapp.com/?lang=ru" target="_blank"><img src="https://i.ibb.co/TP8x7rB/image-13-1.png" alt="image-13-1" border="0" /></a>
              </div>
            </div>
            <div className="Map">
              <MapYandex />
            </div>
          </div>
          <Footer/>
      </div>
    );
  }

  export default Contacts;