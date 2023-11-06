import { useEffect, useRef } from 'react';
import './statistic.scss';
import $api from '../../api';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {Chart as Chart} from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import SERVADRESS from "../servAdress";

function Statistic() {
    const [userData, setUserData] = useState();
    const [choosenGraphic, setChoosenGraphic] = useState(false);
    const navigate = useNavigate();
    const [countOfFilesByType, setCountOfFilesByType] = useState([
        {
            type: "Изображения",
            count: 0,
        },
        {
            type: "Аудио-файлы",
            count: 0,
        },
        {
            type: "Видео-файлы",
            count: 0,
        },
        {
            type: "Текстовые файлы/таблицы",
            count: 0,
        },
        {
            type: "Архивы",
            count: 0,
        },
    ]);

    let labels = ["Изображения", "Аудио-файлы", "Видео-файлы", "Текстовые файлы/таблицы", "Архивы"];
    let data = {
        labels: labels,
        datasets: [{
            label: 'Статистика загруженных файлов',
            data: [...countOfFilesByType.map((el) => el.count)],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(110, 132, 132, 0.2)',
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(110, 132, 132)',
            ],
            borderWidth: 1
        }]
    }
    const changeGraphicsInfo = (choosenInfo) => {
        let newInfo = countOfFilesByType;
            newInfo.map(el => {
                el.count = 0;
            })
        if (choosenInfo === "first") {
            setChoosenGraphic(false);
            userData.files.map((el) => {
                if (el.type.indexOf("image") > -1) {
                    newInfo[0].count = newInfo[0].count + 1;
                } else if (el.type.indexOf("audio") > -1) {
                    newInfo[1].count = newInfo[1].count + 1;
                } else if (el.type.indexOf("video") > -1) {
                    newInfo[2].count = newInfo[2].count + 1;
                } else if (el.type.indexOf("zip") > -1) {
                    newInfo[4].count = newInfo[4].count + 1;
                } else {
                    newInfo[3].count = newInfo[3].count + 1;
                }
            })
            setCountOfFilesByType(newInfo);
        }
        else {
            setChoosenGraphic(true);
            userData.files.map((file) => {
                if (file.type.indexOf("image") > -1) {
                    newInfo[0].count = newInfo[0].count + Number(file.size);
                } else if (file.type.indexOf("audio") > -1) {
                    newInfo[1].count = newInfo[1].count + Number(file.size);
                } else if (file.type.indexOf("video") > -1) {
                    newInfo[2].count = newInfo[2].count + Number(file.size);
                } else if (file.type.indexOf("zip") > -1) {
                    newInfo[4].count = newInfo[4].count + Number(file.size);
                } else {
                    newInfo[3].count = newInfo[3].count + Number(file.size);
                } 
            })
            setCountOfFilesByType(newInfo);
        }
    }
    useEffect(() => {
        $api.get(SERVADRESS + '/auth/getUserData')
            .then((res) => {
                setUserData(res.data.userData);
                console.log(res.data.userData);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
      <div className="Statistic">
            <div className="main__statistic">
                <div onClick={() => navigate("/Store/" + userData.id)} className="back__button">
                    x
                </div>
                <div className="select__graphic">
                    <select onChange={(e) => changeGraphicsInfo(e.target.value)}  name="choice">
                        <option value="first">Количество файлов</option>
                        <option value="second">Занимаемая память</option>
                    </select>
                </div>
                <div className="graphics">
                    {
                        choosenGraphic ? <Bar data = {data} /> : <Bar data = {data} />
                    }
                </div>
            </div>
      </div>
    );
}


export default Statistic;
