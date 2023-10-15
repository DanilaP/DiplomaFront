import { useRef, useState } from 'react';
import './videoCreator.scss';

function VideoCreator({closeModal}) {
    
    const [videoFileBlob, setVideoFileBlob] = useState();
    const videoRef = useRef();
    const stopButton = useRef();
    const sourceRef = useRef();

    const startVideo = () => {
        let data = [];
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            if (videoRef.current) {
                let media_recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                media_recorder.start();

                videoRef.current.srcObject = stream;
                videoRef.current.play();

                media_recorder.onstop = () => {
                    const blob = new Blob(data, {type: 'video/webm'})
                    setVideoFileBlob(blob);
                    let video_local = URL.createObjectURL(new Blob(data, { type: 'video/webm' }));
    	            sourceRef.current.src = video_local;
                }

                media_recorder.addEventListener('dataavailable', function(e) {
                    data = [...data, e.data];
                });

                let stopButton = document.getElementById("stopButton");
                stopButton.addEventListener("click", () => {
                    stream.getTracks().map((track) => {
                        track.stop();
                    })
                    media_recorder.stop();
                })
            }
        });
    }
    return (
        <div className="video__creator">
            <div className="creating__block">
                <div onClick={closeModal} className="close__button">x</div>
                <div className="settings__block">
                    <div onClick={startVideo} className="settings__buttons">Начать запись</div>
                    <div id = "stopButton" ref = {stopButton} className="settings__buttons">Закончить запись</div>
                </div>
                <div className="video__translating__block">
                    <video muted ref={videoRef} id="video" width="766" height="350"></video>
                </div>
                <div onClick={() => console.log(videoFileBlob)} className="upload__button">Загрузить в хранилище</div>
            </div>
        </div>
    );
}


export default VideoCreator;
