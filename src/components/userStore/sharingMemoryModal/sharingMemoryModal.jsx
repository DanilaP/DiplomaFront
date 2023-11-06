import './sharingMemoryModal.scss';




function SharingMemoryModal({close}) {
    
    return (
        <div className="sharing__memory__modal">
            <div className="main">
                <div onClick={close} className='close__button'>x</div>
                <h3>Поделитесь памятью с другом!</h3>
                <input type = "text" placeholder='Id друга' />
                <input type = "text" placeholder='Количество памяти' />
                <button>Поделиться</button>
            </div>
        </div>
    );
}


export default SharingMemoryModal;
