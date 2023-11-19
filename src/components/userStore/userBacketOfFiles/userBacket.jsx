import './userBacket.scss';
import $api from '../../../api';
import { useEffect } from 'react';
import SERVADRESS from "../../servAdress";
import { useState } from 'react';

function UserBacket({close}) {
    const [userData, setUserData] = useState({});

    const recoverFile = async (file) => {
        await $api.post(SERVADRESS + "/files/recoverUserFile", {file})
        .then((res) => {
            setUserData({...userData, backet: res.data.backet});
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const deleteFile = async (file) => {
        await $api.post(SERVADRESS + "/files/deleteFileFromBacket", {file})
        .then((res) => {
            setUserData({...userData, backet: res.data.backet});
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        $api.get(SERVADRESS + '/auth/getUserData')
        .then((res) => {
            setUserData(res.data.userData);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className="backet">
            <div className="backet__main">
                <div onClick={close} className='close__button'>x</div>
                {
                    userData?.backet?.length > 0 ? 
                    null
                    : <h3>Ваша корзина пуста</h3>
                }
                {
                    userData?.backet?.map((el, index) => {
                        return (
                            <div key={index} className='backet__file'>
                                <div className='file__name'>{el.fileName}</div>
                                <div className="backet__settings">
                                    <div onClick={() => recoverFile(el)}>Восстановить</div>
                                    <div onClick={() => deleteFile(el)}>Удалить</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default UserBacket;
