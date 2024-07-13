import { useEffect, useState } from 'react';
import './dateStats.scss';
import { Bar } from 'react-chartjs-2';

function DateStats({close, userData}) {

    //Список всех дней
    let newLabels = [];
    userData.files.map((file) => {
        if (newLabels.indexOf(file.date) === -1) {
            newLabels = [...newLabels, file.date];
        }
    })

    //Финальные данные
    let finalData = [];
    newLabels.map((label) => {
        let count = 0;
        userData.files.map((file) => {
            if (file.date == label) {
                count += 1;
            }
        })
        finalData = [...finalData, {label: label, count: count}];
    })

    let data = {
        labels: newLabels,
        datasets: [{
            label: 'Статистика загруженных файлов',
            data: [...finalData.map((el) => el.count)],
            borderWidth: 1
        }]
    }

    return (
        <div className="DateStats">
            <div onClick={close} className="close__button">x</div>
            <div className="graphic">
                <Bar data = {data}></Bar>
            </div>
        </div>
    );
}


export default DateStats;
