import { useEffect } from 'react';
import './audioPlayer.scss';


function AudioPlayer({audio, closeModal}) {
    useEffect(() => {
        console.log(audio);
    })
    return (
        <div className="audio__player">
            <div className="audio__player__box">
                <div onClick={closeModal} className="close__button">x</div>
                <div className="audio__main">
                    <audio controls>
                        <source src = {audio}></source>
                    </audio>
                </div>
            </div>
        </div>
    );
}


export default AudioPlayer;
