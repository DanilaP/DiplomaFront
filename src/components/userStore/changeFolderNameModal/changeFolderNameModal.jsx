import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../../api';
import './changeFolderNameModal.scss';




function ChangeFolderNameModal({changeFolders, hide, folderId}) {
    
    const [newFolderName, setNewFolderName] = useState("");

    const changeFolderName = async () => {
        await $api.post('https://backend-danila123.amvera.io/files/changeFolderName', {folderName: newFolderName, folderIndex: folderId})
        .then((res) => {
            console.log(res);
            changeFolders(res.data.folders);
            hide();
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="changeFileNameModal">
            <div className="content">
                <div onClick={hide} className="close__button">x</div>
                <input onChange={(e) => setNewFolderName(e.target.value)} type = "text" placeholder='Новое имя папки' />
                <button onClick ={changeFolderName}>Подтвердить</button>
            </div>
        </div>
    );
}
export default ChangeFolderNameModal;