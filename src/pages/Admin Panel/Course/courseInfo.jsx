import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";

function CourseInfo() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //получение данных о курсах
    const { id } = useParams();
    const [coursDetail, setCoursDetail] = useState({});

    useEffect(() => {
        async function fetchCoursDetail() {
            const response = await fetch(`https://fwxds.localto.net/courses/${id}`);
            const data = await response.json();
            setCoursDetail(data);
        }
        fetchCoursDetail();
    }, [id]);

    return (
        <div>
            <NawBarAdmin />
            <div className="CourseEnBegin">
                <p className="contentText">{coursDetail.title}</p>
                <div className="contentList">
                    <h3>Что входит в курс:</h3>
                    <p>{coursDetail.included}</p>
                </div>
                <div className="contentList">
                    <h3>Дополнительно:</h3>
                    <p>{coursDetail.additionally}</p>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;
