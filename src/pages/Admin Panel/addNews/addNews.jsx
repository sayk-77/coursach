import React, {useRef, useState} from "react";
import './addNews.scss';
import NawBarAdmin from '../NawBar Admin/NawBarAdmin';
import { toast } from "react-toastify";

function AddNewsAdmin() {

    const textareaRef1 = useRef(null);
    const textareaRef2 = useRef(null);
    const formRef = useRef(null);
    const textareaSize = (event) => {
        const textarea1 = textareaRef1.current;
        textarea1.style.height = '100px';
        textarea1.style.height = `${textarea1.scrollHeight}px`;
        const textarea2 = textareaRef2.current;
        textarea2.style.height = '100px';
        textarea2.style.height = `${textarea2.scrollHeight}px`;
        formData.set(event.target.name, event.target.value);
    };

    const formData = new FormData();
    const [photo, setPhoto] = useState();
    const [urlPhoto, setUrlPhoto] = useState();

    const showImage = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setPhoto(file);
            setUrlPhoto(URL.createObjectURL(file));
        } else {
            toast.error("Неподдерживаемый тип файла");
        }
    };

    const changeInput = (event) => {
        formData.set(event.target.name, event.target.value);
    }

    const submitNews = async (event) => {
        event.preventDefault();
        formData.append('photo', photo);
        console.log(Array.from(formData.entries()));
        // проверка на заполнение формы
        if(Array.from(formData.entries()).length !== 4) {
            toast.info('Необходимо заполнить все поля');
            return;
        }
        try {
            const response = await fetch('https://fwxds.localto.net/addNew', {
                method: 'POST',
                body: formData
            })
            if(!response.ok) {
                toast.error('Произошла ошибка');
                return;
            }
            toast.success('Новость добавлена');
            formRef.current.reset();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="addNewsAdmin">
            <NawBarAdmin />
            <form onSubmit={submitNews} ref={formRef}>
                <div className="setting">
                    <h2>Изображение:</h2>
                    <div className="setting-top">
                        <input type="file" name="newsImg" onChange={showImage}/>
                        {urlPhoto ? (<img src={urlPhoto} alt="avatar" width="400px" height="300px" />) : ( "" )}
                    </div>
                    <h2>Заголовок:</h2>
                    <div className="setting-title">
                        <input type="text" name='title' onChange={changeInput} placeholder="Заголовок"/>
                    </div>
                    <h2>Подзаголовок:</h2>
                    <div className="setting-subtitle">
                        <textarea ref={textareaRef1} name="subtitle" onChange={textareaSize} placeholder="Подзаголовок"></textarea>
                    </div>
                    <h2>Основной текст новости:</h2>
                    <div className="setting-mainText">
                        <textarea ref={textareaRef2} name="mainText" onChange={textareaSize} placeholder="Основной текст новости"></textarea>
                    </div>
                    <input onChange={changeInput} className="submitNewsBtn" type="submit" value="Создать" />
                </div>
            </form>
        </div>
    );
}

export default AddNewsAdmin;