import React from "react";
import NawBar from "./NawBar/NawBar";
import { useNavigate } from "react-router";


function PageNotFound() {

    const PageStyle = {
        fontSize: "32px",
        fontWeight: 600,
        textAlign: "center",
        paddingTop: "120px"
    }

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    }

    return(
        <div>
            <NawBar />
            <div style={containerStyle}>
                <h1 style={PageStyle}>Страница не найдена &#128579;</h1>
                <button style={{marginTop: "80px"}} onClick={navigateHome}>Вернутся на главную</button>
            </div>
        </div>
    );
}


export default PageNotFound;