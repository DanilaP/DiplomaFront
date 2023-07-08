import { useState } from 'react';
import './modal.scss';
import $api from '../../../api';
import SERVADRESS from "../../servAdress";


function Modal({show}) {
    const [newPassword, setNewPassword] = useState();

    const close = () => {
        show();
    }
    const changePassword = async () => {
        await $api.post(SERVADRESS + '/profile/changeUserPassword', {newPassword: newPassword})
        .then((res) => {
            console.log(res.data);
            close();
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="Modal">
            <div className="content">
                <div onClick={close} className="close__button">x</div>
                <input onChange={(e) => setNewPassword(e.target.value)} placeholder='Ваш новый пароль' type = "password" />
                <button onClick={changePassword}>Обновить пароль</button>
            </div>
        </div>
    );
}


export default Modal;
