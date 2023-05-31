import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";
import "./StudentInfo.scss";

function StudentInfo() {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [userCourseData, setUserCourseData] = useState({});

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userResponse = await fetch(
                    `https://fwxds.localto.net/user-info/${id}`
                );
                const userData = await userResponse.json();
                setUserData(userData);

                const user_id = userData.user_id;

                if (user_id) {
                    const courseResponse = await fetch(
                        "https://fwxds.localto.net/user-info/course",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ user_id }),
                        }
                    );

                    const courseData = await courseResponse.json();
                    setUserCourseData(courseData);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (userData !== undefined) {
            fetchUserData();
        }
    }, []);

    let courseID = 1;
    return (
        <div className="StudentInfo">
            <NawBarAdmin />
            <div className="content">
                <div className="Info">
                    <img
                        src={userData.user_img}
                        alt="avatar"
                        width="200px"
                        height="200px"
                        style={{ borderRadius: "50%" }}
                    />
                    <p>
                        Имя <span>{userData.first_name}</span>
                    </p>
                    <p>
                        Фамилия<span>{userData.last_name}</span>
                    </p>
                    <p>
                        Пол<span>{userData.gender}</span>
                    </p>
                    <p>
                        Телефон<span>{userData.phone}</span>
                    </p>
                    <p>
                        Дата рождения
                        <span>
                            {new Date(userData.birth_date).toLocaleDateString()}
                        </span>
                    </p>
                </div>
                <div className="detailInfo">
                    <h2>
                        Количество курсов: <span>{userCourseData.length}</span>
                    </h2>
                    <div className="courseInfo">
                        <p>Номер</p>
                        <p>Курс</p>
                        <p>Язык</p>
                        <p>Срок</p>
                        <p>Стоимость</p>
                    </div>
                    {userCourseData && Array.isArray(userCourseData) ? (
                        userCourseData.map((course) => (
                            <div className="course-box" key={course.id}>
                                <p>{courseID++}</p>
                                <p>{course.cours_lvl}</p>
                                <img
                                    src={course.language_url}
                                    alt="language"
                                    width="80px"
                                    height="50px"
                                />
                                <p>{course.cours_duration}</p>
                                <p>{course.course_price}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#FC8F44" }}>Курсов Нет...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentInfo;
