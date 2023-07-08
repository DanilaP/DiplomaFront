import './login.scss';
import $api from '../../../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../Images/logo.png';
import SERVADRESS from "../../servAdress";

function Login() {
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const history = useNavigate();

    const goToEnter = () => {
        history('/Enter')
    }
    const registration = () => {
        let rule = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        const user = {
            userLogin: userEmail, 
            userPassword: userPassword
        }
        if ((userPassword.length >= 6) && (rule.test(userEmail))) {
            $api.post('http://localhost:5000/auth/registration', user)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                history("/Profile");
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            return;
        }
    }
  return (
    <div className="Login">
        <div className="login__form">
            <div className="content">
                <img src = {logo} width = {"50px"} height = {"50px"} />
                <div>Регистрация</div>
                <input onChange={(e) => setUserEmail(e.target.value)} type = "text" placeholder='Введите логин' />
                <input onChange={(e) => setUserPassword(e.target.value)} type = "password" placeholder='Введите пароль' />
                <p onClick={goToEnter}>Войти</p>
                <button onClick={registration}>LOG IN</button>
            </div>
        </div>
    </div>
  );
}


export default Login;
