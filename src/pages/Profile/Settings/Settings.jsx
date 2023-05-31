import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import "./Settings.scss";
import NawBar from "../../NawBar/NawBar";
import NawProfile from "../../NawBar/ProfileNawBar/NawProfile";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProfileSettings() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const user_id = jwtDecode(localStorage.getItem("token")).id;

    // валидация полей

    const [birthdate, setBirthdate] = useState(null);
    const daynow = Date.now();

    const validData = (data) => {
        for (const key in data) {
            if (!data[key]) {
                toast.info("Необходимо заполнить все поля");
                return false;
            }
        }

        const nameRegex = /^[а-яА-Яa-zA-Z]{1,15}$/;
        if (!nameRegex.test(data.firstName)) {
            toast.info("Имя должно содержать только буквы и быть не более 15 символов");
            return false;
        }

        if (!nameRegex.test(data.lastName)) {
            toast.info("Фамилия должна содержать только буквы и быть не более 15 символов");
        }

        const genderRegex = /^[а-яА-Яa-zA-Z]{1,10}$/;
        if (!genderRegex.test(data.gender)) {
            toast.error("Поле Пол должно содержать только буквы и быть не более 10 символов");
            return false;
        }


        const birthdateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!birthdateRegex.test(data.birthdate)) {
            toast.info("Поле Дата рождения должно быть в формате ДД/ММ/ГГГГ");
            return false;
        }

        return true;
    };

    // обновдение данных о пользователе
    const saveSetting = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("user_id", user_id);
        const data = Object.fromEntries(formData.entries());
        if (!validData(data)) {
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/save-setting`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                localStorage.removeItem("token");
                localStorage.setItem("token", res_data.accessToken);
                navigate("/profile");
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // получение ифнформации из токена
    const data = jwtDecode(localStorage.getItem("token"));

    const [photo, setPhoto] = useState();
    const [urlPhoto, setUrlPhoto] = useState();

    const changePhoto = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setPhoto(file);
            setUrlPhoto(URL.createObjectURL(file));
        } else {
            toast.error("Неподдерживаемый тип файла");
        }
    };

    const uploadPhoto = async (event) => {
        event.preventDefault();

        if (!photo) {
            toast.warn("Выберите файл!");
            return;
        }

        if (photo.size > 1024 * 1024) {
            toast.error("Размер файла должен быть не более 1 МБ!");
            return;
        }

        const formData = new FormData();
        formData.append("file", photo);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload-photo`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem("token");
                localStorage.setItem("token", data.accessToken);
                toast.success("Фото успешно загружено");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="ProfileSetings">
            <NawBar />
            <div className="SetingsWrapper">
                <NawProfile />
                <div className="SetingsCard">
                    <h2>Основная информация</h2>
                    <div className="SetingsCardInfo">
                        <div className="SetingsCardLeft">
                            <p>Имя</p>
                            <p>Фамилия</p>
                            <p>Пол</p>
                            <p>Телефон</p>
                            <p>Дата рождения</p>
                        </div>
                        <form onSubmit={saveSetting} id="saveData">
                            <div className="SetingsCardMidle">
                                <input
                                    type="text"
                                    name="firstName"
                                    defaultValue={
                                        data.personal_data
                                            ? data.personal_data.first_name
                                            : ""
                                    }
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    defaultValue={
                                        data.personal_data
                                            ? data.personal_data.last_name
                                            : ""
                                    }
                                />
                                <input
                                    type="text"
                                    name="gender"
                                    defaultValue={
                                        data.personal_data
                                            ? data.personal_data.gender
                                            : ""
                                    }
                                />
                                <InputMask
                                    mask="+7 (999) 999-9999"
                                    maskPlaceholder=" "
                                    name="phone"
                                    defaultValue={
                                        data.personal_data
                                            ? data.personal_data.phone
                                            : ""
                                    }
                                />
                                <DatePicker
                                    selected={birthdate}
                                    onChange={(date) => setBirthdate(date)}
                                    dateFormat="dd.MM.yyyy"
                                    name="birthdate"
                                    placeholderText="Выберите дату"
                                    showYearDropdown
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    maxDate={daynow}
                                />
                            </div>
                        </form>
                        <div className="SetingsCardRight">
                            <form
                                className="formPhoto"
                                enctype="multipart/form-data"
                                onSubmit={uploadPhoto}
                            >
                                <label class="label">
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={changePhoto}
                                        form="formPhoto"
                                    />
                                    <span className="inputFile">
                                        Выбрать файл
                                    </span>
                                </label>
                                <button
                                    className="btnImage"
                                    type="submit"
                                    style={{ cursor: "pointer" }}
                                >
                                    Загрузить
                                </button>
                            </form>
                            {urlPhoto ? (
                                <img
                                    src={urlPhoto}
                                    alt="avatar"
                                    width="200px"
                                    height="200px"
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <button className="saveSetting" type="submit" form="saveData">
                    Сохранить
                </button>
                <div className="SettingsDataCard">
                    <h2>Изменить пароль</h2>
                    <div className="SetingsCardDataInfo">
                        <div className="SetingsCardDataLeft">
                            <p>Введите пароль</p>
                            <p>Введите пароль еще раз</p>
                            <p>Введите новый пароль</p>
                        </div>
                        <div className="SetingsCardDataMidle">
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <button className="saveSetting">Сохранить</button>
            </div>
        </div>
    );
}

export default ProfileSettings;