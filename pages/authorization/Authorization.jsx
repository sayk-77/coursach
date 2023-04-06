import React, {useState, useEffect} from "react";
import './Authorization.scss';
function Authorization() {

    // Клиентская часть для авторизации

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, serError] = useState("");
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Функция отправки запроса на сервер для авторизации
    const handleSubmitLog = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3100/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data);
            if (data.success) {
                alert("Успешная авторизация");
                window.location.replace('/');
            } else {
                alert("Ошибка авторизации");
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            alert("Ошибка авторизации");
        }
    };

    //клиентская часть для регистрации

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const handleSubmitReg = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, email, passwordReg }),
        };
        fetch("http://localhost:3100/registr", requestOptions)
            .then((response) => {
                if (response.ok) {
                    console.log("Registration successful");
                    // перенаправляем пользователя на страницу логина
                    alert("Регистрация прошла успешно");
                    window.location.replace('/');
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .catch((error) => {
                console.error("Registration error:", error);
                serError("Registration error");
            });
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

    // Модуль react
    return(
        <div className="Autorization">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmitReg}>
                        <h1>Регистрация</h1>
                        <input  type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required />
                        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Пароль" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} required />
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmitLog}>
                        <h1 className="autorization">Войти</h1>
                        <input type="text" placeholder="Логин" name="username" value={username} onChange={handleUsernameChange} />
                        <input type="password" placeholder="Пароль" name="password" value={password} onChange={handlePasswordChange} />
                        <button type="submit">Войти</button>
                        <a href="#" className="ForgotPassword">Забыли пароль?</a>
                    </form>
                    {error && <p>{error}</p>}
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