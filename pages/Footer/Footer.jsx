import {Routes, Route, Link} from 'react-router-dom';
import React from "react";
import './Footer.scss';

function Footer() {
    return(
      <>
      <div>
        <footer className="Footer">
          <div className="footerTop">
            <Link to='/'><img src="https://i.ibb.co/wR7QjwP/Enschool.png" alt="Enschool" border="0" /></Link>
            <ul>
              <Link to='/'><li>Главная</li></Link>
              <Link to='/about'><li>О нас</li></Link>
              <Link to='/contact'><li>Контакты</li></Link>
              <Link to='/learning'><li>Обучение</li></Link>
            </ul>
            <div className="footerSocial">
              <a href="https://vk.com" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/48br7NX/image-12.png" alt="vk" border="0" /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/h8nF3FG/image-13.png" alt="inst" border="0" /></a>
              <a href="https://web.telegram.org/k/" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/mDzH9VP/image-12-1.png" alt="tg" border="0" /></a>
              <a href="https://www.whatsapp.com/?lang=ru" target="_blank" rel="noreferrer"><img src="https://i.ibb.co/TP8x7rB/image-13-1.png" alt="wc" border="0" /></a>
            </div>
          </div>
            <div className="footerBottom">
            <a href="">2023 © Все права защищены</a>
            <a href="">Политика конфиденциальности</a>
          </div>
        </footer>
      </div>
      <Routes>
        <Route />
      </Routes>
      </>
    );
}

export default Footer;