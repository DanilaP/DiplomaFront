import { useEffect } from 'react';
import './statistic.scss';
import StatisticMenu from './StatisticMenu/statisticMenu';
import $api from '../../api';
import { useState } from 'react';



function Statistic() {
    const [userData, setUserData] = useState();
    const [showMore, setShowMore] = useState(false);
    const [infoFiles, setInfoFiles] = useState();

    const calculateAllFileSize = (arrOfFiles) => {
        let sum = 0;
        arrOfFiles?.map((e) => {
            sum += Number(e.size);
        })
        sum = sum.toFixed(2);
        return sum;
    }
    const calculateMoreStatistic = () => {
        setShowMore(true);
        let info = {
            videosCount: 0,
            videoSSize: 0,
            imagesCount: 0,
            imagesSize: 0,
            textFilesCount: 0,
            textFilesSize: 0,
        };
        userData.files.map((e) => {
            if (e.type.indexOf('video') > -1) {
                info.videosCount += 1;
                info.videoSSize += Number(e.size);
            }
            if (e.type.indexOf('image') > -1) {
                info.imagesCount += 1;
                info.imagesSize += Number(e.size);
            }
            if (e.type.indexOf('application') > -1) {
                info.textFilesCount += 1;
                info.textFilesSize += Number(e.size);
            }
        })
        setInfoFiles(info)
    }
    useEffect(() => {
        $api.get('http://localhost:5000/auth/getUserData')
            .then((res) => {
                setUserData(res.data.userData);
            })
            .catch((error) => {
                console.log(error);
        })
    }, [])
    return (
      <div className="Statistic">
            <div className="main__statistic">
                <StatisticMenu />
                <div className="statistic__info">
                    <div className='userName'>Пользователь: {userData?.login}</div>
                    <div className="total__files">Всего файлов загружено: {userData?.files.length}</div>
                    <div className="total__files__size">Всего памяти занято: {calculateAllFileSize(userData?.files)} mb</div> 
                </div>
                <div onClick={() => calculateMoreStatistic()} className='show__stat__button'>Посмотреть подробную статистику</div>
                {showMore 
                ? 
                <div className="showMore">
                    <div className="images__info">
                        <div>Всего изображений загружено: {infoFiles.imagesCount}</div>
                        <div>Память, занятая изображениями: {infoFiles.imagesSize} mb</div>
                    </div>
                    <div className="videos__info">
                        <div>Всего видео-файлов загружено: {infoFiles.videosCount}</div>
                        <div>Память, занятая видео-файлами: {infoFiles.videoSSize} mb</div>
                    </div>
                    <div className="text__files__info">
                        <div>Всего текстовых файлов/таблиц загружено: {infoFiles.textFilesCount}</div>
                        <div>Память, занятая текстовыми файлами/таблицами: {infoFiles.textFilesSize} mb</div>
                    </div>
                </div> 
                : null 
                }
            </div>
      </div>
    );
}


export default Statistic;
