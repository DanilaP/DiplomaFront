import { useNavigate } from 'react-router-dom';
import './userStore.scss';
import $api from '../../api';
import { useEffect } from 'react';
import { useState } from 'react';
import ChangeFileNameModal from './changeFileNameModal/changeFileNameModal';
import ProgressBar from './progressBar/progressBar';
import videoicon from '../../Images/videopng.png';
import folderImage from '../../Images/folderImage.png';
import pdficon from '../../Images/pdf.png';
import excelicon from '../../Images/excel.png';
import wordicon from '../../Images/word.png';
import audioIcon from '../../Images/audioIcon.png';
import ImageSlider from './imageSlider/imageSlider';
import VideoPlayer from './videoPlayer/videoPlayer';
import store from '../../store';
import { useSelector } from 'react-redux';
import ChangeFolderNameModal from './changeFolderNameModal/changeFolderNameModal';
import CreatedFolderModal from './createFolderModal/createFolderModal';

function UserStore() {
    const history = useNavigate();
    const [user, setUser] = useState();
    const [isChangeFileName, setIsChangeFileName] = useState(false);
    const [previosname, setPreviosname] = useState();
    const [sizeOfUserFiles, setSizeOfUserFiles] = useState();
    const [sortedFiles, setSortedFiles] = useState();
    const [parametrOfSort, setParametrOfSort] = useState();
    const [sliderShown, setSliderShown] = useState();
    const [videoShown, setVideoShown] = useState();
    const [choosenFilePath, setChoosenFilePath] = useState();
    const [findedFileName, setFindedFileName] = useState();

    const userObjectFiles = useSelector(store => store.userFiles);

    const [choosenFolderId, setChoosenFolderId] = useState(0);
    const [isChangeFolderName, setIsChangeFolderName] = useState(false);
    const [historyOfFolders, setHistoryOfFolders] = useState([0]);
    const [historyOfLastFolder, setHistoryOfLastFolder] = useState();
    const [isCreateFolder, setIsCreateFolder] = useState(false);

    const uploadFile = async (file) => {
        let formData = new FormData();
        formData.append('uploadFile', file[0]);
        formData.append('folderId', choosenFolderId);
        //store.dispatch({type: "UPLOADEDFILE", payload: formData});
        await $api.post('http://localhost:5000/uploadFiles', formData)
        .then((res) => {
            let files = res.data.files.filter(el => el.folderId === choosenFolderId);
            setUser({...user, files: files});
            setSortedFiles(files);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const sortFiles = (param) => {
        setParametrOfSort(param);
        switch(param) {
            case "image": setSortedFiles(user.files.filter((e) => e.type.indexOf('image') > -1));
            break;
            case "video": setSortedFiles(user.files.filter((e) => e.type.indexOf('video') > -1));
            break;
            case "text": setSortedFiles(user.files.filter((e) => e.type.indexOf('application') > -1));
            break;
            case "all": setSortedFiles(user.files);
            break;
        }
    }
    const changeFileName = async (name) => {
        setPreviosname(name);
        if (isChangeFileName) {
            setIsChangeFileName(false);
        }
        else {
            setIsChangeFileName(true);
        }
    }
    const changeFolderName = async (folderId) => {
        setHistoryOfLastFolder(choosenFolderId);
        await setChoosenFolderId(folderId);
        isChangeFolderName ? setIsChangeFolderName(false) : setIsChangeFolderName(true);
    }
    const updateFolders = async (newFolders) => {
        await setChoosenFolderId(historyOfLastFolder);
        setUser({...user, folders: newFolders.filter(el => el.parentFolderId == historyOfLastFolder)});
    }
    const updateFiles = (newFiles) => {
        user.files = newFiles;
        setSortedFiles(newFiles.filter(el => el.folderId === choosenFolderId));
        sortFiles(parametrOfSort);
    }
    const deleteFile = async (filePath) => {
        //store.dispatch({type: "DELETEDFILEPATH", payload: filePath})
        await $api.post('http://localhost:5000/files/deleteFile', {deletedFilePath: filePath})
        .then((res) => {
            setSortedFiles(res.data.files.filter(el => el.folderId === choosenFolderId));
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const calculateAllFileSize = (arrOfFiles) => {
        let sum = 0;
        sortedFiles?.map((e) => {
            sum += Number(e.size);
        })
        sum = sum.toFixed(2);
        setSizeOfUserFiles(sum);
    }
    const openVideo = (path) => {
        setChoosenFilePath(path);
        videoShown ? setVideoShown(false) : setVideoShown(true);
    }
    const openSlider = (path) => {
        setChoosenFilePath(path);
        sliderShown ? setSliderShown(false) : setSliderShown(true);
    }
    const findFileByName = (e) => {
        if(e.keyCode == 13){
            setSortedFiles(sortedFiles.filter(e => e.fileName == findedFileName));
        }
        else {
            setSortedFiles(user.files);
        }
    }
    const createFolder = async () => {
        isCreateFolder ? setIsCreateFolder(false) : setIsCreateFolder(true);
    }
    const updateUserFolders = async (folders) => {
        setUser({...user, folders: folders});
    }
    const deleteFolder = async (folderId) => {
        await $api.post('http://localhost:5000/files/deleteFolder', {folderId: folderId, parentFolderId: choosenFolderId})
        .then((res) => {
            setUser({...user, folders: res.data.folders});
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const getFilesFromFolders = async (folderId) => {
        await $api.post('http://localhost:5000/getFilesFromFolder', {folderId: folderId})
        .then((res) => {
            setUser({...user, folders: res.data.folders, files: res.data.files});
            setSortedFiles(res.data.files);
            setChoosenFolderId(folderId);
            setHistoryOfFolders([...historyOfFolders, folderId]);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        console.log([...historyOfFolders, folderId]);
    }
    const backToFolder = async () => {
        let lastFolder;
        if (historyOfFolders.length >= 3) {
            lastFolder = historyOfFolders[historyOfFolders.length-2];
        }
        else lastFolder = historyOfFolders[0];

        await $api.post('http://localhost:5000/getFilesFromFolder', {folderId: lastFolder})
        .then((res) => {
            setUser({...user, folders: res.data.folders, files: res.data.files});
            setSortedFiles(res.data.files);
            setChoosenFolderId(lastFolder);
            if (historyOfFolders.length !== 1) {
                let newHistory = historyOfFolders;
                newHistory.pop();
                setHistoryOfFolders(newHistory);
            }
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        calculateAllFileSize(user?.files);
    }, [user])
    useEffect(() => {
        setUser({...user, files: userObjectFiles});
        setSortedFiles(userObjectFiles);
        sortFiles(parametrOfSort);
    }, [userObjectFiles])
    useEffect(() => {
        $api.post('http://localhost:5000/getFilesFromFolder', {folderId: choosenFolderId})
        .then((res) => {
            setUser({...user, folders: res.data.folders, files: res.data.files});
            setSortedFiles(res.data.files);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className="UserStore">
            { sliderShown ? <ImageSlider image = {choosenFilePath} openSlider = {openSlider} /> : null  }
            { videoShown ? <VideoPlayer image = {choosenFilePath} openVideo = {openVideo} /> : null  }
            { isChangeFileName ? <ChangeFileNameModal updateFiles = {updateFiles} previosname = {previosname} hide = {changeFileName} /> : null }
            { isChangeFolderName ? <ChangeFolderNameModal changeFolders = {updateFolders} folderId = {choosenFolderId} hide = {changeFolderName} /> : null }
            { isCreateFolder ? <CreatedFolderModal updateUserFolders = {updateUserFolders} choosenFolderId = {choosenFolderId} hide = {createFolder} /> : null }
            <div className="store">
                <div className="store__menu">
                    <div onClick={() => sortFiles("all")} className='div__btn'>Все файлы</div>
                    <div onClick={() => sortFiles("text")} className='div__btn'>Текстовые файлы</div>
                    <div onClick={() => sortFiles("video")} className='div__btn'>Видео файлы</div>
                    <div onClick={() => sortFiles("image")} className='div__btn'>Изображения</div>
                    <input onKeyDown={findFileByName} onChange={(e) => setFindedFileName(e.target.value)} type = "text" placeholder='Поиск файла'/>

                    <div className='upload__main'>
                        <input accept="image/*,video/*,.doc,.pdf,.xls, audio/*" onChange={(e) => uploadFile(e.target.files)} type = "file"></input>
                        <div className='upload__file'>Загрузить файл</div>
                    </div>
                </div>
                <div className="storage__files">
                    <div className="files">
                        {sortedFiles?.map((e, id) => {
                            if (e.type.indexOf('image') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <div onClick={() => openSlider(e.path)}>
                                                <img width={"150px"} height={"150px"} src = {e.path}/>
                                            </div>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('video') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <div onClick={() => openVideo(e.path)}>
                                                <img width={"150px"} height={"150px"} src = {videoicon}/>
                                            </div>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if ((e.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1) || (e.type.indexOf('application/msword') > -1)) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a href={e.path}>
                                                <div>
                                                    <img width={"150px"} height={"150px"} src = {wordicon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('application/pdf') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a href={e.path}>
                                                <div>
                                                    <img width={"150px"} height={"150px"} src = {pdficon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('application/vnd.ms-excel') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a href={e.path}>
                                                <div>
                                                    <img width={"150px"} height={"150px"} src = {excelicon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('audio') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a href={e.path}>
                                                <div>
                                                    <img width={"150px"} height={"150px"} src = {audioIcon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                        })}
                        {user?.folders?.map((e, id) => {
                            return (
                                <div key={id} className="file">
                                    <div onClick={() => deleteFolder(e.folderId)} className="delete__button">x</div>
                                        <a>
                                            <div onClick={() => getFilesFromFolders(e.folderId)}>
                                                <img width={"150px"} height={"150px"} src = {folderImage}/>
                                            </div>
                                        </a>
                                    <span onClick={() => changeFolderName(e.folderId)}>{e.folderName}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="storage__settings">
                        <div className="navigation__menu">
                            <div onClick={() => history("/Profile")} className='item'>Мой профиль</div>
                            <div onClick={() => history("/Statistic")} className='item'>Статистика</div>
                            <button onClick={backToFolder} className="back__to__folder__button">Назад</button>
                            <div onClick={createFolder} className="item">Создать папку</div>
                         </div>
                        <div className="header">Вместимость хранилища</div>
                        <ProgressBar percentageNew={sizeOfUserFiles} />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserStore;
