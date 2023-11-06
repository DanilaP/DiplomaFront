import { useNavigate } from 'react-router-dom';
import './storeForShowing.scss';
import zipImage from '../../Images/allFilesIcon.png';
import pdficon from '../../Images/pdf.png';
import excelicon from '../../Images/excel.png';
import wordicon from '../../Images/word.png';
import audioIcon from '../../Images/audioIcon.png';
import videoicon from '../../Images/videopng.png';
import foldericon from '../../Images/folderImage.png';
import { useState } from 'react';
import { useEffect } from 'react';

function StoreForShowing({arrayOfFiles, arrayOfFolders}) {
    const history = useNavigate();
    
    const [searchingName, setSearchingName] = useState("");
    const [sortedArray, setSortedArray] = useState(arrayOfFiles);
    const [currentFolderId, setCurrentFolderId] = useState(0);
    const [sortedArrayOfFolders, setSortedArrayOfFolders] = useState(arrayOfFolders);
    const [historyOfFolders, setHistoryOfFolders] = useState([0]);

    const searchFiles = () => {
        if (searchingName == "") {
            console.log(arrayOfFiles);
            setSortedArray(sortedArray);
        }
        else {
            const newSortedArray = sortedArray.filter(e => e.fileName.toLowerCase().includes(searchingName.toLowerCase()));
            setSortedArray(newSortedArray);
        }
    }
    const goToFolder = (folderId) => {
        setCurrentFolderId(folderId);
        setHistoryOfFolders([...historyOfFolders, folderId]);
    }
    const backToFolder = () => {
        if (historyOfFolders.length == 1) {
            return;
        }
        let newHistoryOfFolders =  historyOfFolders;
        let lastFolder = newHistoryOfFolders[newHistoryOfFolders.length - 2];
        newHistoryOfFolders.pop();
        setHistoryOfFolders(newHistoryOfFolders);
        setCurrentFolderId(lastFolder);
    }
    useEffect(() => {
        console.log(historyOfFolders);
    }, [historyOfFolders])
    useEffect(() => {
        setCurrentFolderId(0);
    }, [])
    useEffect(() => {
        let newFiles = arrayOfFiles.filter((el) => (el.folderId === currentFolderId && el.status == "public"));
        let newFolders = arrayOfFolders.filter((el) => (el.parentFolderId === currentFolderId && el.status == "public"));
        setSortedArrayOfFolders(newFolders);
        setSortedArray(newFiles);
    }, [currentFolderId])
    return (
        <div className="StoreForShowing">
            <div className="settings">
                <input onChange={(e) => setSearchingName(e.target.value)} type = "text" placeholder='Поиск файлов'/>
                <button onClick={searchFiles}>Найти</button>
                <button onClick={backToFolder}>Назад</button>
            </div>
            <div className="store">
                {sortedArray.map((e, id) => {
                    if ((e.type.indexOf('image') > -1) && e.status !== "private") {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {e.path}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('video') > -1) && e.status !== "private") {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {videoicon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1)
                     || (e.type.indexOf('application/msword') > -1) && e.status !== "private") {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {wordicon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('application/pdf') > -1) && e.status !== "private") {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {pdficon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('application/vnd.ms-excel') > -1) && e.status !== "private") {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {excelicon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('audio') > -1) && e.status !== "private") {
                        return (
                            <div key={id} className="file">
                                <a target='_blank' href = {e.path}>
                                    <img width={"150px"} height={"150px"} src = {audioIcon}/>
                                </a>
                                <span>{e.fileName}</span>
                            </div>
                        )
                    }
                    else if ((e.type.indexOf('zip') > -1) && e.status !== "private") {
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
                {sortedArrayOfFolders?.map((e) => {
                    return (
                        <div onClick={() => goToFolder(e.folderId)} key={e.folderId} className="file">
                            <img width={"150px"} height={"150px"} src = {foldericon}/>
                            <span>{e.folderName}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


export default StoreForShowing;
