import {React, useEffect} from "react";
import Footer from "../../Footer/Footer";
import Invite from "../../Invite/Invite";
import './Language.scss';
import NawBar from "../../NawBar/NawBar";

function Language() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div>
            <NawBar />
            <div className="languageFour">
                <h1>В нашей школе изучают 4 языка:</h1>
                <div className="language">
                    <div className="languageLeft">
                        <div className="LanguageCard">
                            <img src="assets/en.png" alt="en" />
                            <p>Английский язык</p>
                        </div>
                        <div className="LanguageCard">
                        <img src="assets/deu.png" alt="deu" />
                        <p>Английский язык</p>
                        </div>
                    </div>
                    <div className="languageRight">
                        <div className="LanguageCard">
                        <img src="assets/china.png" alt="china" />
                        <p>Английский язык</p>
                        </div>
                        <div className="LanguageCard">
                        <img src="assets/italy.png" alt="italy" />
                        <p>Английский язык</p>              
                        </div>
                    </div>
                </div>
            </div>
            <div className="WhyLanguages">
                <h2>Почему именно эти языки</h2>
                <ol>
                    <li>Английский язык является 2 по популярности языком в мире. На нем говорят боллее 1 миллиарда человек. Он является официальным в 70-ти странах. Так же этот язык считается самым востребовым. На нем говорят в Великобритании , США, Австралии, Новая Зеландии, Ирландии, Канаде, Индии, Нигерии и многих других странах. Так же это основаной язык, который изучают в школах..</li>
                    <li>Китайский язык является самым популярыным языком, так как на нем говорят более 1 миллиарда человек. К тому же, этот язык является самым сложным языком из за своей письменности. На этом языке разговаривают в Китае, Малайзии, Сингапуре, Тайване, Индонезии, Таиланде, Монголии и на Филипинах</li>
                    <li>Итальянский язык находится на 2 месте по популярности. На нем разговаривают более 495 миллионов человек. На нем говорят в Италии, Швейцарии, Ватикане, Сан-Марино и Словении. Изучение этого языка даст вам возможность путешествовать по этим странам, не тратя лишние деньги на гидов или переводчиков</li>
                    <li>Немецкий язык занимает 10 место по популярности. На этом языке говорят более 100 миллионов человек. Этот язык так-же преподают в школе</li>
                </ol>
            </div>
            <Footer/>
        </div>
    );
}

export default Language;