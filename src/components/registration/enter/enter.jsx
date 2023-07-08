import { useState } from 'react';
import './enter.scss';
import $api from '../../../api';
import { useNavigate } from 'react-router-dom';
import logo from '../../../Images/logo.png';
import ErrorBox from '../errorBox/errorBox';
import SERVADRESS from "../../servAdress";

function Enter() {
    const [userLogin, setUserLogin] = useState();
    const [userPassword, setUserPassword] = useState();
    const history = useNavigate();
    const [isError, setIsError] = useState();
    const [errorText, setErrorText] = useState("");

    const login = () => {
        history('/Login')
    }
    const showModal = () => {
        isError ? setIsError(false) : setIsError(true);
    }
    const enter = async () => {
        let userData = {
            userLogin: userLogin,
            userPassword: userPassword,
        }
        let rule = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        if ((userPassword.length >= 6) && (rule.test(userLogin))) {
            await $api.post('http://localhost:5000/auth/login', userData)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                history("/Profile");
                console.log(res.data);
            })
            .catch((error) => {
                setErrorText("Данный пользователь не найден. Проверьте логин и пароль");
                setIsError(true);
                console.log(error);
            }) 
        }
        else {
            setErrorText("Проверьте правильность email и длину пароля (не менее 6 символов)");
            setIsError(true);
        }
    }
    return (
        <div className="Enter">
            <div className="content">
                <img src = {logo} width={"50px"} height={"50px"} />
                <div>Вход</div>
                <input onChange={(e) => {setUserLogin(e.target.value)}} placeholder='Ваш логин' type = "text" /> 
                <input onChange={(e) => {setUserPassword(e.target.value)}} placeholder='Ваш пароль' type = "password" /> 
                <p onClick={login}>Регистрация</p>
                {isError ? <ErrorBox showModal = {showModal} text = {errorText} /> : null }
                <button onClick={enter}>Войти</button>
            </div>
        </div>
    );
}


export default Enter;
