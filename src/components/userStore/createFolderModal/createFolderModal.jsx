import { useState } from 'react';
import $api from '../../../api';
import './createFolderModal.scss';




function CreatedFolderModal({hide, choosenFolderId, updateUserFolders}) {
    const [folderName, setFolderName] = useState("");

    const createFolder = async () => {
        await $api.post('https://backend-danila123.amvera.io/createFolder', {folderName: folderName, parentFolderId: choosenFolderId})
        .then((res) => {
            updateUserFolders(res.data.folders);
            hide();
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="createFolderModal">
            <div className="content">
                <div onClick={hide} className="close__button">x</div>
                <input onChange={(e) => setFolderName(e.target.value)} type = "text" placeholder='Имя папки' />
                <button onClick ={createFolder}>Подтвердить</button>
            </div>
        </div>
    );
}
export default CreatedFolderModal;
