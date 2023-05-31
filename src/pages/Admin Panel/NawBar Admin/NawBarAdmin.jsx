import React, { useEffect } from "react";
import "./NawBarAdmin.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function NawBarAdmin() {

    const navigate = useNavigate();

    const ClickExit = () => {
        toast.success('Вы вышли из админ. панели');
        localStorage.removeItem('admin');
        navigate('/');
    }

    useEffect(() => {
        const token = localStorage.getItem('admin');
        if(!token) {
            navigate('/panel/admin');
        }
    }, [])

    return(
        <header className="NawAdmin">
            <ul>
                <Link to="/panel/admin/student">
                    <li>Ученики</li>
                </Link>
                <Link to="/panel/admin/course">
                    <li>Курсы</li>
                </Link>
                <Link to="/panel/admin/news">
                    <li>Новости</li>
                </Link>
                <Link to="/panel/admin/reviews">
                    <li>Отзывы</li>
                </Link>
            </ul>
            <img src="https://ltdfoto.ru/images/2023/04/28/Group-153.png" alt="exit" onClick={ClickExit}/>
        </header>
    );
}

export default NawBarAdmin;