import {React, useEffect} from "react";
import './CourseEnBegin.scss';
import Footer from '../../../Footer/Footer';
import NawBar from "../../../NawBar/NawBar";


function CourseEnBegin() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return(
        <div>
            <NawBar />
            <div className="CourseEnBegin">
                <div className="contentTop">
                    <div className="contentTopEl">
                        <h2>Язык:</h2>
                        <p>Английский</p>
                    </div>
                    <div className="contentTopEl">
                        <h2>Уровень: </h2>
                        <p>Начинающий</p>
                    </div>
                    <div className="contentTopEl">
                        <h2>Срок обучения:</h2>
                        <p>4 недели, 3 занятия в неделю</p>
                    </div>
                    <div className="contentTopEl">
                        <h2>Стоимость:</h2>
                        <p>19 000 рублей</p>
                    </div>
                </div>
                <p className="contentText">Обучение начинающего уровня в английском языке включает основы грамматики, лексику и разговорные обороты. Кроме того, ученик начального уровня должен освоить навыки аудирования, говорения, чтения и письма.</p>
                <div className="contentList">
                    <h3>Что входит в курс:</h3>
                    <ul>
                        <li>Алфавит и произношение букв</li>
                        <li>Основы грамматики, такие как глагол "to be", глаголы в настоящем времени, простое прошедшее время и неопределенный артикль</li>
                        <li>Приветствие и представление на английском языке</li>
                        <li>Разговорные обороты для общения на английском языке, такие как попросить совет, спросить о чем-то, описать свои интересы</li>
                        <li>Основы чтения и письма, включая правильное написание и произношение слов, составление простых предложений и чтение простых текстов</li>
                        <li>Развитие навыков аудирования, слушание коротких аудио- и видеозаписей, просмотр коротких видеороликов и прослушивание аудиокниг для начинающих.</li>
                    </ul>
                </div>
                <div className="contentList">
                    <h3>Дополнительно:</h3>
                    <ul>
                        <li>Числительные и даты, чтобы ученик мог говорить о времени и днях недели на английском языке</li>
                        <li>Описание физического вида, характера и интересов, чтобы ученик мог описывать себя и других людей на английском языке</li>
                        <li>Основы английской культуры и традиций, чтобы ученик мог лучше понимать англоязычное общество и культуру</li>
                        <li>Развитие словарного запаса и улучшение произношения через аудирование и повторение фраз и слов</li>
                        <li>Упражнения на применение грамматики и лексики в письменных и устных формах</li>
                        <li>Упражнения на понимание и анализ текстов на английском языке, чтобы ученик мог лучше понимать содержание текстов на английском языке и извлекать нужную информацию.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CourseEnBegin;