import { useNavigate } from 'react-router-dom';
import './statisticMenu.scss';




function StatisticMenu() {
  const history = useNavigate();
  
  return (
    <div className="statistic__menu">
        <div onClick={() => history("/Profile")}>Мой профиль</div>
    </div>
  );
}


export default StatisticMenu;