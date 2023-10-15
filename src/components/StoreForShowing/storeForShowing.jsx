import { useNavigate } from 'react-router-dom';
import './storeForShowing.scss';
import zipImage from '../../Images/allFilesIcon.png';
import pdficon from '../../Images/pdf.png';
import excelicon from '../../Images/excel.png';
import wordicon from '../../Images/word.png';
import audioIcon from '../../Images/audioIcon.png';
import videoicon from '../../Images/videopng.png';

function StoreForShowing({arrayOfFiles}) {
    const history = useNavigate();
     
    return (
        <div className="StoreForShowing">
            <div className="store">
                {arrayOfFiles.map((e, id) => {
                    if (e.type.indexOf('image') > -1) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {e.path}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if (e.type.indexOf('video') > -1) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {videoicon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1) || (e.type.indexOf('application/msword') > -1)) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {wordicon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if (e.type.indexOf('application/pdf') > -1) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {pdficon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if (e.type.indexOf('application/vnd.ms-excel') > -1) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {excelicon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if (e.type.indexOf('audio') > -1) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {audioIcon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if (e.type.indexOf('zip') > -1) {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {zipImage}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}


export default StoreForShowing;
