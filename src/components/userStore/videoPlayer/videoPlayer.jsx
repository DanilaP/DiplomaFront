import { useEffect } from 'react';
import './videoPlayer.scss';



function VideoPlayer({file, image, openVideo}) {
    
    const copyLink = () => {
        navigator.clipboard.writeText(file.path);
    }

    return (
        <div className="VideoPlayer">
            <div className="videoPlayer__box">
                <div onClick={openVideo} className="close__button">x</div>
                <video controls>
                    <source src={image} type="video/mp4"/>
                    <source src={image} type="video/webm"/>
                </video>
                <div className="file__info">
                    <div className='file__info__header'>Информация о файле</div>
                    <div>Имя файла: {file.fileName}</div>
                    <div>Размер файла: {file.size} мб</div>
                    <div className='div__link' onClick={copyLink}>Скопировать ссылку на файл</div>
                </div>
            </div>
        </div>
    );
}


export default VideoPlayer;