import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.scss';
import $api from '../../api';
import { useState } from 'react';
import Modal from './changePasswordModal/modal';
import SERVADRESS from "../servAdress";


function Profile() {
    const history = useNavigate();
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [secretCode, setSecretCode] = useState("");
    const inputRef = useRef();
    const messageRef = useRef();

    const goBack = () => {
        history('/Store');
    }
    const logout = () => {
        localStorage.removeItem("token");
        history('/');
    }
    const changePassword = () => {
        showModal ? setShowModal(false) : setShowModal(true);
    }
    const changeAvatar = async (e) => {
        let formData = new FormData();
        formData.append('uploadFile', e[0]);
        
        await $api.post(SERVADRESS + '/upload', formData)
        .then((res) => {
            console.log(res);
            setUser({...user, avatar: res.data.avatar})
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const changeSecretCode = async () => {
        if (secretCode != "") {
            await $api.post(SERVADRESS + '/profile/changeUserSecretCode', {newSecretAccessCode: secretCode})
            .then((res) => {
                inputRef.current.value = "";
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else return;
    }
    const copyLink = async () => {
        navigator.clipboard.writeText("http://localhost:3000/SecretAccessForm/"+user.id)
        .then(() => {
            messageRef.current.style.animation = "opacityAnimation 1s"; 
        })
        messageRef.current.style.animation = "";
    }
    useEffect(() => {
        $api.get(SERVADRESS + '/auth/getUserData')
        .then((res) => {
            console.log(res.data.userData);
            setUser(res.data.userData);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className="main">
            {showModal ? <Modal show = {changePassword} /> : null}
            <div className="Profile">
                <div className="main__content">
                    <div onClick={goBack} className="close__button">
                        X
                    </div>
                    <img width={"150px"} height={"150px"} src = {user.avatar}></img>
                    <div className='upload__file__div'>
                        <span>Загрузить фото</span>
                        <input accept="image/*" onChange={(e) => changeAvatar(e.target.files)} type = "file" />
                    </div>
                    <div className="user__info">
                        <div className="user__login">{user.login}</div>
                        <div className="user__password">**********</div>
                    </div>
                    <div className="change__secret__code">
                        <input ref = {inputRef} placeholder='Новый код доступа' onChange={(e) => setSecretCode(e.target.value)} type = "text" />
                        <button onClick={changeSecretCode}>Send</button>
                    </div>
                    <div className="link__to__show__store">
                        <div ref={messageRef} className="message__about__copying">Ссылка скопирована!</div>
                        <p onClick={copyLink}>Ссылка на хранилище</p>
                    </div>
                    <div className="settings">
                        <button onClick={changePassword}>Сменить пароль</button>
                        <button onClick={logout}>Выйти</button>
                        <button onClick={() => history("/Store/" + user.id)}>Перейти в хранилище</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Profile;
