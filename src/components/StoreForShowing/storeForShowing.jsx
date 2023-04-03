import { useNavigate } from 'react-router-dom';
import './storeForShowing.scss';
import allFilesIcon from '../../Images/allFilesIcon.png';



function StoreForShowing({arrayOfFiles}) {
    const history = useNavigate();
     
    return (
        <div className="StoreForShowing">
            <div className="store">
                {arrayOfFiles.map((e, index) => {
                    return (
                        <div key={index} className="file">
                            <a target="_blank" name = {e.fileName} href = {e.path}>
                                <img src = {allFilesIcon}/>
                            </a>
                            <span>{e.fileName}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


export default StoreForShowing;
