import { useNavigate } from 'react-router-dom';
import './videoPlayer.scss';



function VideoPlayer({image, openVideo}) {
  const history = useNavigate();
  
  return (
    <div className="VideoPlayer">
        <div className="videoPlayer__box">
            <div onClick={openVideo} className="close__button">x</div>
            <video controls>
                <source src={image} type="video/mp4"/>
                <source src={image} type="video/webm"/>
            </video>
        </div>
    </div>
  );
}


export default VideoPlayer;