import React, {useEffect} from 'react';
import Footer from '../Footer/Footer';
import './AboutUs.scss';
import NawBar from "../NawBar/NawBar";

function AboutUs() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div>
        <NawBar />
        <div className='AboutUs'>
            <div className='about'>
                <div className='aboutLeft'>
                    <h2>Несколько слов о нас</h2>
                    <p>Чем больше вы или ваш ребенок знает, тем больше у вас возможностей. Цель нашей школы - научить основам иностранных языков, получить более продвинутый уровень. Получение возможность общатся с носителями на их языке. Подготовка к экзаменам, или деловым встречам.</p>
                </div>
                <img src="assets/aboutImage.png" alt="image" />
            </div>
            <div className='content'>
                <h1>Не стесняйтесь общаться</h1>
                <div className='contentImage'>
                    <div className='contentCard'>
                        <img src="assets/contentCard1.png" alt="image" />
                        <p>Наши учителя все время совершенствуются. Проходят множественные курсы, посещают семинары и участвуют в деловых встречах</p>
                    </div>
                    <div className='contentCard'>
                        <img src="assets/contentCard2.png" alt="image" />
                        <p>Наша команда здесь, чтобы поддержать вас на индивидуальной основе, изучая ресурсы и возможности, чтобы структурировать путь к вашим личным целям изучения языка.</p>
                    </div>
                    <div className='contentCard'>
                        <img src="assets/contentCard3.png" alt="image" />
                        <p>Мы предлагаем 12 курсов на 4 языках. Они включают в себя английский, немецкий, китайский и испанский языки. Мы поможем подобрать курс для вас.</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
  );
}

export default AboutUs;
