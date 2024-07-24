import { useEffect, useRef } from 'react';
import './imageSlider.scss';

function ImageSlider({file, image, openSlider}) {
    const imageRef = useRef();

    const copyLink = () => {
        navigator.clipboard.writeText(file.path);
    }

    useEffect(() => {
        console.log(file);
        imageRef.current.style.backgroundImage = `url('${image}')`;
    }, [])

    return (
        <div className="ImageSlider">
            <div className="image__box">
                <div onClick={openSlider} className="close__button">x</div>
                <div ref={imageRef} className="div__image"></div>
                <div className="image__info">
                    <div className='image__info__header'>Информация о файле</div>
                    <div className="image__info__main">
                        <div>Имя файла: {file.fileName}</div>
                        <div>Размер файла: {file.size} мб</div>
                        <div className='div__link' onClick={copyLink}>Скопировать ссылку на файл</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageSlider;