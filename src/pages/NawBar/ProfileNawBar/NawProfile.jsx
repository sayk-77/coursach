import React from "react";
import {Link} from "react-router-dom";
import './NawProfile.scss';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NawProfile() {

    const navigate = useNavigate();

    const ExitProfile = () => {
        localStorage.removeItem('token');
        toast.success('Вы успешно вышли из своего профиля');
        navigate('/');
    }

    return(
        <div className="NawProfile">
            <div className="DataTitle">
                <h1>Мой профиль</h1>
                <div className="DataSubtitle">
                    <Link to='/profile'>Профиль</Link>
                    <Link to='/profileCourse'>Курсы</Link>
                    <img src="https://ltdfoto.ru/images/2023/05/07/Untitled742582f96ae0dc25.png" className="exit" onClick={ExitProfile} width="50px" height="50px"/>
                </div>
            </div>
        </div>
    );
}

export default NawProfile;