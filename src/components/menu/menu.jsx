import { useNavigate } from 'react-router-dom';
import './menu.scss';

function Menu() {
  const history = useNavigate();

  const goToChoosenPage = (pageName) => {
      switch (pageName) {
        case "Profile": history("/Profile"); break;
        case "Double": history("/Roullete"); break;
        case "Store": history("/Store"); break;
      }
  }
  return (
    <div className="menu">
        <div onClick={() => goToChoosenPage("Profile")}>Ваш профиль</div>
        <div onClick={() => goToChoosenPage("Store")}>Хранилище</div>
    </div>
  );
}

export default Menu;