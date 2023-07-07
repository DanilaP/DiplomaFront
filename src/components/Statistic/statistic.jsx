import { useEffect, useRef } from 'react';
import './statistic.scss';
import $api from '../../api';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {Chart as Chart} from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

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
    ]);

    const labels = ["Изображения", "Аудио-файлы", "Видео-файлы", "Текстовые файлы/таблицы"];
    const data = {
    labels: labels,
    datasets: [{
        label: 'Статистика загруженных файлов',
        data: [...countOfFilesByType.map((el) => el.count)],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        ],
        borderWidth: 1
    }]
    };
    const canvas = useRef();
    
    useEffect(() => {
        $api.get('https://backend-danila123.amvera.io/auth/getUserData')
            .then((res) => {
                setUserData(res.data.userData);
                let countOfFiles = countOfFilesByType;
                res.data.userData.files.map((el) => {
                    if (el.type.indexOf("image") > -1) {
                        countOfFiles[0].count = countOfFiles[0].count + 1;
                    } else if (el.type.indexOf("audio") > -1) {
                        countOfFiles[1].count = countOfFiles[1].count + 1;
                    } else if (el.type.indexOf("video") > -1) {
                        countOfFiles[2].count = countOfFiles[2].count + 1;
                    } else if (el.type.indexOf("application") > -1) {
                        countOfFiles[3].count = countOfFiles[3].count + 1;
                    }
                })
            })
            .catch((error) => {
                console.log(error);
        })
    }, [])
    return (
      <div className="Statistic">
            <div className="main__statistic">
                <div onClick={() => navigate("/Profile")} className="back__button">
                    x
                </div>
                <div className="select__graphic">
                    <select onChange={() => choosenGraphic ? setChoosenGraphic(false) : setChoosenGraphic(true)}  name="choice">
                        <option value="first">Столбчатая диаграмма</option>
                        <option value="second">Круговая диаграмма</option>
                    </select>
                </div>
                <div className="graphics">
                    {
                        choosenGraphic ? <Pie data = {data} /> : <Bar data = {data} />
                    }
                </div>
            </div>
      </div>
    );
}


export default Statistic;
