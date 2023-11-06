import { useState } from 'react';
import './fileSettingsModal.scss';
import $api from '../../../api';
import SERVADRESS from "../../servAdress";


function FolderSettingsModal({close, file}) {
    
    const [newFileStatus, setNewFileStatus] = useState("");

    const changeFileStatus = async () => {
        let newFile = file;
        newFile.status = newFileStatus;

        await $api.post(SERVADRESS + '/changeFolderStatus', {folder: newFile})
        .then((res) => {
            console.log(res.data);
            close();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="file__settings__modal">
            <div className="file__settings__main">
                <div onClick={close} className='close__button'>x</div>
                <h3>Выберите статус папки: </h3>
                <div className="statuses">
                    <button onClick={() => setNewFileStatus("private")}>Приватный</button>
                    <button onClick={() => setNewFileStatus("public")}>Публичный</button>
                </div>
                <button onClick={changeFileStatus} className="confirm__button">Изменить</button>
            </div>
        </div>
    );
}


export default FolderSettingsModal;
