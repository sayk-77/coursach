import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./adminLogin.scss";

function AdminLogin() {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    
    const adminLog = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch("https://fwxds.localto.net/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password: password, login: login}),
            });

            const data = await response.json();

            if(data.success) {
                toast.success(data.message);
                localStorage.setItem("admin", data.adminToken);
                localStorage.removeItem('token');
                navigate('/panel/admin/student');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="admin-login">
            <form onSubmit={adminLog}>
                <div className="login">
                    <p>Введите логин</p>    
                    <input type="text" name="login" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required/>
                    <p>Введите пароль</p>
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
}

export default AdminLogin;