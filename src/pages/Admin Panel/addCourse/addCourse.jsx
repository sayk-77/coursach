import React, {useRef} from "react";
import './addCourse.scss';
import NawBarAdmin from '../NawBar Admin/NawBarAdmin'
import { toast } from "react-toastify";

function AddCourse() {

    const textareaRef1 = useRef(null);
    const textareaRef2 = useRef(null);
    const textareaRef3 = useRef(null);
    const formRef = useRef(null);
    const textareaSize = (event) => {
        const textarea1 = textareaRef1.current;
        textarea1.style.height = '100px';
        textarea1.style.height = `${textarea1.scrollHeight}px`;
        const textarea2 = textareaRef2.current;
        textarea2.style.height = '100px';
        textarea2.style.height = `${textarea2.scrollHeight}px`;
        const textarea3 = textareaRef3.current;
        textarea3.style.height = '100px';
        textarea3.style.height = `${textarea3.scrollHeight}px`;
        formData.set(event.target.name, event.target.value);
    };

    // сохранение курса в базе данных
    const formData = new FormData();    

    const changeInput = (event) => {
        formData.set(event.target.name, event.target.value);
    }

    const submitCourse = async (event) => {
        event.preventDefault();
        const urlSearchParams = new URLSearchParams(formData);
        const jsonData = Object.fromEntries(urlSearchParams);
        // проверка на заполнение формы
        if (Object.keys(jsonData).length === 0) {
            toast.info('Необходимо заполнить все поля');
            return;
        }
        try {
            const result = await fetch("https://fwxds.localto.net/addCourseAdmin", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            });
            const data = await result.json();
            toast.success(data.message);
            formRef.current.reset();
        } catch (error) {
            toast.error('Произошла ошибка');
            console.log(error);
        }
    }

    return(
        <div className="addCourse">
            <NawBarAdmin />
            <form ref={formRef} onSubmit={submitCourse}>
                <div className="setting-top">
                    <div className="setting-item">
                        <p>Язык:</p>
                        <select name="language" onChange={changeInput}>
                            <option value="1">Английский</option>
                            <option value="2">Итальянский</option>
                            <option value="3">Китайский</option>
                            <option value="4">Немецкий</option>
                        </select>
                    </div>
                    <div className="setting-item">
                        <p>Уровень:</p>
                        <input type="text" name="language_lvl" onChange={changeInput}/>
                    </div>
                    <div className="setting-item">
                        <p>Срок обучения:</p>
                        <input type="text" name="duration" onChange={changeInput}/>
                    </div>
                    <div className="setting-item">
                        <p>Цена:</p>
                        <input type="text" name="price" onChange={changeInput}/>
                    </div>
                </div>
                <div className="setting-title">
                    <textarea name="title" placeholder="Краткая информация о курсе" ref={textareaRef1} onChange={textareaSize   }></textarea>
                </div>
                <h2>Что входит в курс:</h2>
                <div className="setting-included">
                    <textarea name="included" placeholder="Что входит" ref={textareaRef2} onChange={textareaSize}></textarea>
                </div>
                <h2>Дополнительно:</h2>
                <div className="setting-additionally">
                    <textarea name="additionaly" placeholder="Дополнительно" ref={textareaRef3} onChange={textareaSize}></textarea>
                </div>
                <input className="add" type="submit" value="Создать"/>
            </form>
        </div>
    );
}

export default AddCourse;