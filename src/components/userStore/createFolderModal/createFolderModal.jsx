import { useState } from 'react';
import $api from '../../../api';
import './createFolderModal.scss';
import SERVADRESS from "../../servAdress";

function CreatedFolderModal({hide, choosenFolderId, updateUserFolders}) {
    
    const [folderName, setFolderName] = useState("");

    const createFolder = async () => {
        if (folderName !== "") {
            await $api.post(SERVADRESS + '/createFolder', {folderName: folderName, parentFolderId: choosenFolderId})
            .then((res) => {
                updateUserFolders(res.data.folders);
                hide();
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div className="createFolderModal">
            <div className="content">
                <div onClick={hide} className="close__button">x</div>
                <input minLength={1}
                       maxLength={15} 
                       onChange={(e) => setFolderName(e.target.value)} 
                       type = "text" 
                       placeholder='Имя папки (1-15 символов)' />
                <button onClick ={createFolder}>Подтвердить</button>
            </div>
        </div>
    );
}

export default CreatedFolderModal;
