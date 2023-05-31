import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import './Authorization.scss';
import { toast } from 'react-toastify';

function Authorization() {

    const navigate = useNavigate();
    // для вывода ошибок
    const [error, setError] = useState("");

    // для авторизации
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    // Отправка запроса на сервер для авторизации
        const SubmitLog = async (event) => {
            event.preventDefault();
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'ngrok-skip-browser-warning' : 1
                    },
                    body: JSON.stringify({ username, password }),
                });


                const data = await response.json();
                if (data.success) {
                    localStorage.setItem("token", data.accessToken);
                    toast.success(data.message);
                    navigate('/profile');
                } else {
                    toast.error("Неверный логин или пароль");
                }
            } catch (error) {
                console.log(error);
                alert('Произошла ошибка');
            }
        };

    //клиентская часть для регистрации

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const SubmitReg = async (event) => {
        event.preventDefault();

        const emailValidate = /\S+@\S+\.\S+/;

        //валидация почты
        if(!emailValidate.test(email)) {
            toast.error('Не верный формат эл. почты');
            return;
        }
        // валидация логина
        switch(true) {
            case login.length < 4:
                toast.error('Логин должен содержать не менее 4 символов');
                return;
            case login.length > 10:
                toast.error('Логин не должен содержать более 10 символов')
        }

        //валидация пароля
        switch(true) {
            case passwordReg.length < 6:
                toast.error('Пароль должен содержать не менее 6 символов');
                return;
            case !/\d/.test(passwordReg):
                toast.error('Пароль должен содержать хотя бы 1 цифру');
                return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/registr`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, email, passwordReg }),
            });
            const dataMessage = await response.json();
            if (response.ok) {
                toast.success("Регистрация прошла успешно!");
            } else {
                toast.error(dataMessage.error);
            }
        } catch (error) {
            console.error("Ошибка регистрация", error);
            toast.error("Ошибка регистрации");
        }
    };

    //анимация окна регистрации и авторизации по нажатию кнопки
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        signUpButton.addEventListener('click', () =>
            container.classList.add('right-panel-active'));
        signInButton.addEventListener('click', () =>
            container.classList.remove('right-panel-active'));
    }, []);

    return(
        <div className="Autorization">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={SubmitReg}>
                        <h1>Регистрация</h1>
                        <input  type="text"  placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required />
                        <input type="email"  placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password"  placeholder="Пароль" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} required />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={SubmitLog}>
                        <h1 className="autorization">Войти</h1>
                        <input type="text" placeholder="Логин" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Пароль" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <button type="submit">Войти</button>
                        <a href="#" className="ForgotPassword">Забыли пароль?</a>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Добро пожаловать!</h1>
                            <p>Чтобы оставаться на связи с нами, пожалуйста, войдите, используя свои данные</p>
                            <button className="ghost" id="signIn">Войти</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>С возвращением!</h1>
                            <p>Введите свои личные данные, чтобы продолжить</p>
                            <button className="ghost" id="signUp">Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authorization;