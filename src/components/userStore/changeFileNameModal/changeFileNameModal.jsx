import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../../api';
import './changeFileNameModal.scss';
import SERVADRESS from "../../servAdress";



function ChangeFileNameModal({hide, previosname, updateFiles}) {
    const history = useNavigate();
    const [newFileName, setNewFileName] = useState();

    const changeFileName = async () => {
        $api.post('http://localhost:5000/files/changeFileName', {fileName: previosname, newName: newFileName})
        .then((res) => {
            console.log(res);
            updateFiles(res.data.files);
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
                <input onChange={(e) => setNewFileName(e.target.value)} type = "text" placeholder='Новое имя файла' />
                <button onClick={changeFileName}>Подтвердить</button>
            </div>
        </div>
    );
}
export default ChangeFileNameModal;