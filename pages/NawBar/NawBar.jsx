import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./NawBar.scss";

function NawBar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <header className="NawBar">
      <div className="NawBarWrapper">
        <Link to="/">
        <img className="NawBarlogo" src="https://i.ibb.co/wR7QjwP/Enschool.png" alt="Enschool" border="0" />
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
          <Link to="/profile">
            <img src="https://i.ibb.co/hFWFqmZ/user.png" alt="user" border="0" />
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default NawBar;
