import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './userStoreEnter.scss';
import $api from '../../../api';
import StoreForShowing from '../../StoreForShowing/storeForShowing';
import SERVADRESS from "../../servAdress";

function UserStoreEnter() {
    const history = useNavigate();
    const params = useParams();
    const [enteredCode, setEnteredCode] = useState();
    const [showStore, setShowStore] = useState(false);
    const [userFiles, setUserFiles] = useState([]);
    const [userFolders, setUserFolders] = useState([]);

    const sendCode = () => {
        $api.post(SERVADRESS + '/profile/getUserDataById', {id: params.id, secretAccessCode: enteredCode})
        .then((res) => {
            setShowStore(true);
            setUserFiles(res.data.userData.files);
            setUserFolders(res.data.userData.folders);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="UserStoreEnter">
            {showStore 
            ?
            <StoreForShowing arrayOfFolders = {userFolders} arrayOfFiles={userFiles}/> 
            : 
            <div className="secret__code__enter__form">
                <input onChange={(e) => setEnteredCode(e.target.value)} type = "text" />
                <button onClick={sendCode}>Проверить код</button>
            </div>
            }
        </div>
    );
}


export default UserStoreEnter;
