import { useEffect, useState } from 'react';
import './sharingMemoryModal.scss';
import $api from '../../../api';
import SERVADRESS from "../../servAdress";


function SharingMemoryModal({close}) {
    
    const [user, setUser] = useState();
    const [userSharingToId, setUserSharingToId] = useState("");
    const [sharingMemory, setSharingMemory] = useState();

    const calcalateFreeUserMemory = () => {
        let freeMemory = user?.memory;
        user?.files.map((file) => {
            freeMemory -= Number(file.size);
        })
        return freeMemory?.toFixed(0);
    }

    const shareMemory = async () => {
        await $api.post(SERVADRESS + '/shareUserMemory', {userId: userSharingToId, memory: Number(sharingMemory)})
        .then((res) => {
            console.log(res);
            close();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        $api.get(SERVADRESS + '/auth/getUserData')
        .then((res) => {
            setUser(res.data.userData);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className="sharing__memory__modal">
            <div className="main">
                <div onClick={close} className='close__button'>x</div>
                <h3>Поделитесь памятью с другом!</h3>
                <h5>Ваш лимит памяти: {calcalateFreeUserMemory()} мб</h5>
                <input onChange={(e) => setUserSharingToId(e.target.value)} type = "text" placeholder='Id друга' />
                <input onChange={(e) => setSharingMemory(e.target.value)} type = "text" placeholder="Количество памяти"/>
                <button onClick={shareMemory}>Поделиться</button>
            </div>
        </div>
    );
}


export default SharingMemoryModal;
