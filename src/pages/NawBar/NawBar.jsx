import jwtDecode from "jwt-decode";
import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./NawBar.scss";

function NawBar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // анимация выпадающего списка
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };  

  const token = localStorage.getItem('token');

  const [image, setImage] = useState("");

  useEffect(() => {
      async function UserAvatar() {
        const token = localStorage.getItem("token");
    
        if (token !== null && jwtDecode(token).exp > (Date.now() / 1000)) {
          const data = jwtDecode(token);
          setImage(data.personal_data.user_img);
        }
      }
    
      UserAvatar();    
  }, []);
  

  return (
    <header className="NawBar">
      <div className="NawBarWrapper">
        <Link to="/">
        <img className="NawBarlogo" src="https://i.ibb.co/wR7QjwP/Enschool.png" alt="Enschool" id="logo" border="0" />
        </Link>
        <ul>
          <Link to="/">
            <li>Главная</li>
          </Link>
          <Link to="/about">
            <li>О нас</li>
          </Link>
          <Link to="/contact">
            <li>Контакты</li>
          </Link>
          <li>
            <div className="dropdown" ref={dropdownRef}>
              <div className="dropdown_btn" onClick={toggleDropdown}>
                Обучение
              </div>
              <div>
                <ul className={`dropdown_list ${isOpen ? "open" : ""}`}>
                  <Link to='/courses'><li className="dropdown__item">Курсы</li></Link>
                  <Link to='/language'><li className="dropdown__item">Языки</li></Link>
                  <Link to='/news'><li className="dropdown__item">Новости</li></Link>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <Link to={token && jwtDecode(token).exp > (Date.now() / 1000) ? "/profile" : "/login"}>
          {image ? 
          <img id="profile" src={image}/>  
          :
          (<img src="https://ltdfoto.ru/images/2023/05/20/Group-181.png" alt="user" id="profile" border="0" />)}
        </Link>
      </div>
    </header>
  );
}

export default NawBar;
