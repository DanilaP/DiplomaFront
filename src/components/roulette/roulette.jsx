import roulette from '../../Images/roulette.png';
import './roulette.scss';
import { useRef, useState } from 'react';
import { getNumbersInfo } from '../../InfoAboutNumbers';
import store from '../../store';
import ModalBoxError from './errorModalBox/errorModalBox';
import money from '../../Images/money.png';
import $api from '../../api';
import { useEffect } from 'react';
import Menu from '../menu/menu';

function Roulette() {

    const rouletteRef = useRef();
    const [count, setCount] = useState(true);
    const [history, setHistory] = useState([]);
    const [userBalance, setUserBalance] = useState();
    const [gameIsEmpty, setGameIsEmpty] = useState(false);
    const [bet, setBet] = useState();
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [userColor, setUserColor] = useState("");


    const changeBalance = async (newBalance) => {
        await $api.post('http://localhost:5000/auth/changeUserBalance', {balance: newBalance})
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const createAnimation = () => {
        if (gameIsEmpty) {
            return;
        }
        else {
            if ((userBalance > 0) && (bet <= userBalance) && (userBalance > 0)) {
                if (userColor !== "") {
                    //Change balance after makeing the bet
                    store.dispatch({type: "CHANGEBALANCE", payload: userBalance-bet});
                    let newBalance = userBalance-bet;
                    changeBalance(newBalance);
                    setUserBalance(newBalance);
                    //Game starting
                    setGameIsEmpty(true);
                    let newDegrees = 0;
                    let numbers = getNumbersInfo();
                    let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
                    newDegrees = randomNumber.degrees;
                    
                    if (count) {
                        rouletteRef.current.style.webkitTransform = 'rotate(' + newDegrees + 'deg)';
                        setCount(false);
                    }
                    else {
                        rouletteRef.current.style.transition = '0s';
                        rouletteRef.current.style.webkitTransform = 'rotate(' + 0 + 'deg)';
                        setTimeout(() => {
                        rouletteRef.current.style.transition = '5s';
                        rouletteRef.current.style.webkitTransform = 'rotate(' + newDegrees + 'deg)';
                        }, 1)
                    }
                    setTimeout(() => {
                        if (history.length == 18) {
                            let newHistory = history.shift();
                            setHistory(newHistory);
                        }
                        if ((userColor == randomNumber.color) && (userColor !== "green")) {
                            store.dispatch({type: "CHANGEBALANCE", payload: Number(userBalance)+Number(bet)});
                            let newBalance = Number(userBalance)+Number(bet);
                            changeBalance(newBalance);
                            setUserBalance(newBalance);
                        }
                        else if ((userColor == randomNumber) && (userColor == "green")){
                            store.dispatch({type: "CHANGEBALANCE", payload: userBalance+bet*36});
                            let newBalance = userBalance+bet*36;
                            changeBalance(newBalance);
                            setUserBalance(newBalance);
                        }
                        setHistory([...history, randomNumber]);
                        setGameIsEmpty(false);
                    }, 5100)
                }
                //Game ended
                else {
                    setError("Выберете цвет, на который хотите поставить");
                    setIsError(true);
                }
            }
            else {
                setError("Ставка не введена или введена некорректно");
                setIsError(true);
            }
        }
        
    }
    const startAnimFunc = () => {
        createAnimation();
    }
    const showModal = () => {
        isError ? setIsError(false) : setIsError(true);
    }
    const getData = async () => {
        await $api.get('http://localhost:5000/auth/getUserData')
        .then((res) => {
            store.dispatch({type: "USER", payload: res.data.userData});
            setUserBalance(res.data.userData.balance);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="Roulette">
            <Menu />
            {isError ? <ModalBoxError show = {showModal} text = {error}/> : null}
            <div className="history">
                {history.map((element) => {
                    return (
                        <div style={{backgroundColor: `${element.color}`}} className='info'>
                            {element.number}
                        </div>
                    )
                })}
            </div>
            <div className="game__window">
                <div className='roulette'>
                    <div className="triangle_down"></div>
                    <img ref = {rouletteRef} src = {roulette} width = {"520px"}  height = {"500px"} />
                </div>
                <div className="game__settings">
                <div className='user__balance'>{userBalance} <img src = {money} width = {"25px"} height = {"25px"}></img></div>
                    <input maxLength={"6"} onChange={(e) => setBet(e.target.value)} placeholder='Введите размер ставки'/>
                    <div className="chooseColorBox">
                        <button className = {userColor == "red" ? 'redButton__active' : 'redButton'} 
                                onClick={() => setUserColor("red")}>
                                <div className={userColor == "red" ? 'text__active' : 'text__not__active'}>{bet}
                                <img src = {money} width = {"25px"} height = {"25px"}></img>
                                </div>
                         </button>
                        <button className = {userColor == "black" ? 'blackButton__active' : 'blackButton'} 
                                onClick={() => setUserColor("black")}>
                                <div className={userColor == "black" ? 'text__active' : 'text__not__active'}>{bet}
                                <img src = {money} width = {"25px"} height = {"25px"}></img>
                                </div>
                        </button>
                        <button className = {userColor == "green" ? 'greenButton__active' : 'greenButton'}
                                onClick={() => setUserColor("green")}>
                                <div className={userColor == "green" ? 'text__active' : 'text__not__active'}>{bet}
                                <img src = {money} width = {"25px"} height = {"25px"}></img>
                                </div>
                        </button>
                    </div>
                    <button onClick={startAnimFunc}>Крутить колесо</button>
                </div>
            </div>
        </div>
    );
}

export default Roulette;