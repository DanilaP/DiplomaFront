import { useNavigate } from 'react-router-dom';
import './imageSlider.scss';



function ImageSlider({image, openSlider}) {
  const history = useNavigate();
  
  return (
    <div className="ImageSlider">
        <div className="image__box">
            <div onClick={openSlider} className="close__button">x</div>
            <img src = {image} />
        </div>
    </div>
  );
}


export default ImageSlider;