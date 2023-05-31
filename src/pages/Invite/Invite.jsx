import {React, useEffect} from "react";
import './Invite.scss';
import Footer from "../Footer/Footer";
import NawBar from "../NawBar/NawBar";

function Invite() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <NawBar />
            <div className='invite'>
                <div className='inviteLeft'>
                    <h3>Подача заявления в  нашу школу</h3>
                    <p>1. Принести удостоверение личности, фотографию.</p>
                    <p>2. Заполнить заявление на прохождение вступительного теста.</p>
                    <p>3. После получения результатов теста, произвоится подбор подходящего курса.</p>
                    <p>4. Оплата половины стоимости курса, вторая половина должна быть оплачена до конца 4 недели обучения.</p>
                    <p>5. Зачисление на обучение.</p>
                </div>
                <img src="assets/inviteImage.png" alt="image" />
            </div>
            <Footer />
        </div>
    );
}

export default Invite;