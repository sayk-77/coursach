import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import NawBarAdmin from "../NawBar Admin/NawBarAdmin";  
import "./Students.scss";
import { Link } from "react-router-dom";

function Students() {
    const [stud, setStud] = useState([]);
  
    useEffect(() => {
      const fetchStudent = async () => {
        try {
          const response = await fetch("https://fwxds.localto.net/fetchStudent");
          if (response.ok) {
            const data = await response.json();
            setStud(data);
          } else {
            const errorData = await response.json();
            toast.error(errorData.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchStudent();
    },[]);

    // нумерация пользователей
    let st_id = 1;
  
    return (
      <div className="Students">
        <NawBarAdmin />
        <div className="content">
          <h1>
            Количество учеников: {stud.rowCount}
            <span className="students-count">{stud.length}</span>
          </h1>
          {Array.isArray(stud) && stud.length > 0 ? ( stud.map((stud) => (
              <div className="student" key={st_id}>
                <p id="id">{st_id++}</p>
                <img src={stud.user_img}  width="60px" height="60px" style={{borderRadius: "50%"}}/>
                <p>{stud.first_name}</p>
                <p>{stud.last_name}</p>
                <Link to={`/panel/admin/student/${stud.id}`}>Подробнее</Link>
              </div>
            ))) :
            ( <p>Пользователей нет</p>)}
        </div>
      </div>
    );
  }
  
  export default Students;
  