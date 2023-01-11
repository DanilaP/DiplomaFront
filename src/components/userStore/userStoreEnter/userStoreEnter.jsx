import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './userStoreEnter.scss';
import $api from '../../../api';
import StoreForShowing from '../../StoreForShowing/storeForShowing';


function UserStoreEnter() {
    const history = useNavigate();
    const params = useParams();
    const [enteredCode, setEnteredCode] = useState();
    const [showStore, setShowStore] = useState(false);
    const [userFiles, setUserFiles] = useState([]);

    const sendCode = () => {
        $api.post('http://localhost:5000/profile/getUserDataById', {id: params.id, secretAccessCode: enteredCode})
        .then((res) => {
            setShowStore(true);
            setUserFiles(res.data.userData.files)
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="UserStoreEnter">
            {showStore 
            ?
            <StoreForShowing arrayOfFiles={userFiles}/> 
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
