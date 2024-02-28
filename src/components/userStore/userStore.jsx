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
import backetFile from '../../Images/backet_file.png';
import audioIcon from '../../Images/audioIcon.png';
import ImageSlider from './imageSlider/imageSlider';
import VideoPlayer from './videoPlayer/videoPlayer';
import { useSelector } from 'react-redux';
import ChangeFolderNameModal from './changeFolderNameModal/changeFolderNameModal';
import CreatedFolderModal from './createFolderModal/createFolderModal';
import SERVADRESS from "../servAdress";
import VideoCreator from './videoCreator/videoCreator';
import zipImage from '../../Images/allFilesIcon.png';
import FileSettingsModal from './contextMenu/fileSettingsModal';
import SharingMemoryModal from './sharingMemoryModal/sharingMemoryModal';
import FolderSettingsModal from './contextMenu/folderSettingsModal';
import UserBacket from './userBacketOfFiles/userBacket';
import AudioPlayer from './audioPlayer/audioPlayer';

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

    const [isVideoCreatingStart, setIsVideoCreatingStart] = useState(false);
    ////////
    const [isFileSettingsActive, setIsFileSettingsActive] = useState(false);
    const [isFolderSettingsActive, setIsFolderSettingsActive] = useState(false);
    const [changedFile, setChangedFile] = useState({});
    ///////
    const [isShowingMemoryModal, setIsShowingMemoryModal] = useState(false);
    const [userMemory, setUserMemory] = useState(0);
    ///////
    const [isUserBacketActive, setIsUserBacketActive] = useState(false);
    ///////
    const [isAudioShown, setIsAudioShown] = useState(false);
    const [audioPath, setAudioPath] = useState();

    const uploadFile = async (file) => {
        let formData = new FormData();
        formData.append('uploadFile', file[0]);
        formData.append('folderId', choosenFolderId);
        
        if ((Number(sizeOfUserFiles) + Number((file[0].size/1024/1024).toFixed(2))) > 8192) {
            alert("Недостаточно места в хранилище!");
            return;
        }
        else {
            await $api.post(SERVADRESS + '/uploadFiles', formData)
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
            case "audio": setSortedFiles(user.files.filter((e) => e.type.indexOf('audio') > -1));
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
        await $api.post(SERVADRESS + '/files/deleteFile', {deletedFilePath: filePath})
        .then((res) => {
            setSortedFiles(res.data.files.filter(el => el.folderId === choosenFolderId));
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const calculateAllFileSize = (arrOfFiles) => {
        let sum = 0;
        arrOfFiles.map((e) => {
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
            setSortedFiles(sortedFiles.filter(e => e.fileName.toLowerCase().includes(findedFileName.toLowerCase())));
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
        await $api.post(SERVADRESS + '/files/deleteFolder', {folderId: folderId, parentFolderId: choosenFolderId})
        .then((res) => {
            setUser({...user, folders: res.data.folders});
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const moveFolderToBacket = async (folder) => {
        await $api.post(SERVADRESS + '/files/moveFolderToBacket', {folder})
        .then((res) => {
            setUser({...user, folders: res.data.folders});
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const getFilesFromFolders = async (folderId) => {
        await $api.post(SERVADRESS + '/getFilesFromFolder', {folderId: folderId})
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

        await $api.post(SERVADRESS + '/getFilesFromFolder', {folderId: lastFolder})
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
    const createVideoFile = () => {
        isVideoCreatingStart ? setIsVideoCreatingStart(false) : setIsVideoCreatingStart(true);
    }
    ////
    const showFileSettingsModal = (file) => {
        setChangedFile(file);
        isFileSettingsActive ? setIsFileSettingsActive(false) : setIsFileSettingsActive(true);
    }
    const showFolderSettingsModal = (file) => {
        setChangedFile(file);
        isFolderSettingsActive ? setIsFolderSettingsActive(false) : setIsFolderSettingsActive(true);
    }
    ////
    const showMemoryModal = () => {
        isShowingMemoryModal ? setIsShowingMemoryModal(false) : setIsShowingMemoryModal(true);
    }
    ////
    const openUserBacket = async () => {
        isUserBacketActive ? setIsUserBacketActive(false) : setIsUserBacketActive(true);
        if (isUserBacketActive) {
            await $api.post(SERVADRESS + '/getFilesFromFolder', {folderId: choosenFolderId})
            .then((res) => {
                setUser({...user, folders: res.data.folders, files: res.data.files});
                setSortedFiles(res.data.files);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    ////
    const openAudio = (path) => {
        setAudioPath(path);
        isAudioShown ? setIsAudioShown(false) : setIsAudioShown(true);
    }

    useEffect(() => {
        setUser({...user, files: userObjectFiles});
        setSortedFiles(userObjectFiles);
        sortFiles(parametrOfSort);
    }, [userObjectFiles])
    useEffect(() => {
        $api.post(SERVADRESS + '/getFilesFromFolder', {folderId: choosenFolderId})
        .then((res) => {
            setUser({...user, folders: res.data.folders, files: res.data.files});
            setSortedFiles(res.data.files);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })

        $api.get(SERVADRESS + '/auth/getUserData')
        .then((res) => {
            setUserMemory(res.data.userData.memory);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    useEffect(() => {
        $api.get(SERVADRESS + '/auth/getUserData')
        .then((res) => {
            calculateAllFileSize(res.data.userData.files);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    return (
        <div className="UserStore">
            { isAudioShown ? <AudioPlayer audio={audioPath} closeModal = {openAudio} /> : null }
            { isUserBacketActive ? <UserBacket currentFolder = {choosenFolderId} close = {openUserBacket} /> : null }
            { isFolderSettingsActive ? <FolderSettingsModal file = {changedFile} close = {showFolderSettingsModal} /> : null }
            { isShowingMemoryModal ? <SharingMemoryModal close = {showMemoryModal} /> : null }
            { isFileSettingsActive ? <FileSettingsModal file = {changedFile} close = {showFileSettingsModal} /> : null }
            { isVideoCreatingStart ? <VideoCreator closeModal={createVideoFile} /> : null }
            { sliderShown ? <ImageSlider image = {choosenFilePath} openSlider = {openSlider} /> : null  }
            { videoShown ? <VideoPlayer image = {choosenFilePath} openVideo = {openVideo} /> : null  }
            { isChangeFileName ? <ChangeFileNameModal updateFiles = {updateFiles} previosname = {previosname} hide = {changeFileName} /> : null }
            { isChangeFolderName ? <ChangeFolderNameModal changeFolders = {updateFolders} folderId = {choosenFolderId} hide = {changeFolderName} /> : null }
            { isCreateFolder ? <CreatedFolderModal updateUserFolders = {updateUserFolders} choosenFolderId = {choosenFolderId} hide = {createFolder} /> : null }
            <div className="store">
                <div className="store__menu">
                    <button onClick={backToFolder} className="back__to__folder__button">Назад</button>
                    <div onClick={() => sortFiles("all")} className='div__btn'>Все файлы</div>
                    <div onClick={() => sortFiles("text")} className='div__btn'>Текстовые файлы</div>
                    <div onClick={() => sortFiles("video")} className='div__btn'>Видео файлы</div>
                    <div onClick={() => sortFiles("image")} className='div__btn'>Изображения</div>
                    <div onClick={() => sortFiles("audio")} className='div__btn'>Аудио файлы</div>
                    <input onKeyDown={findFileByName} onChange={(e) => setFindedFileName(e.target.value)} type = "text" placeholder='Поиск файла'/>

                    <div className='upload__main'>
                        <input accept="image/*,video/*,.doc,.pdf,.xls, audio/*, .zip,.rar,.7zip" onChange={(e) => uploadFile(e.target.files)} type = "file"></input>
                        <div className='upload__file'>Загрузить файл</div>
                    </div>
                </div>
                <div className="storage__files">
                    <div className="files">
                        {sortedFiles?.map((e, id) => {
                            if (e.type.indexOf('image') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <div onClick={() => openSlider(e.path)}>
                                                <img width={"100px"} height={"100px"} src = {e.path}/>
                                            </div>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('video') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <div onClick={() => openVideo(e.path)}>
                                                <img width={"100px"} height={"100px"} src = {videoicon}/>
                                            </div>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if ((e.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1) || (e.type.indexOf('application/msword') > -1)) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a target="_blank" href={e.path}>
                                                <div>
                                                    <img width={"100px"} height={"100px"} src = {wordicon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('application/pdf') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a target="_blank" href={e.path}>
                                                <div>
                                                    <img width={"100px"} height={"100px"} src = {pdficon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('application/vnd.ms-excel') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a target="_blank" href={e.path}>
                                                <div>
                                                    <img width={"100px"} height={"100px"} src = {excelicon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('audio') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a onClick={() => openAudio(e.path)}>
                                                <div>
                                                    <img width={"100px"} height={"100px"} src = {audioIcon}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                            else if (e.type.indexOf('zip') > -1) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFileSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => deleteFile(e.path)} className="delete__button">x</div>
                                            <a href={e.path}>
                                                <div>
                                                    <img width={"100px"} height={"100px"} src = {zipImage}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFileName(e.fileName)}>{e.fileName}</span>
                                    </div>
                                )
                            }
                        })}
                        {user?.folders?.map((e, id) => {
                            if (e.isDeleted !== true) {
                                return (
                                    <div key={id} className="file">
                                        <div onClick={() => showFolderSettingsModal(e)} 
                                        className={e.status == "public" ?  "status": "private__status"}>&#10033;</div>
                                        <div onClick={() => moveFolderToBacket(e)} className="delete__button">x</div>
                                            <a>
                                                <div onClick={() => getFilesFromFolders(e.folderId)}>
                                                    <img width={"100px"} height={"100px"} src = {folderImage}/>
                                                </div>
                                            </a>
                                        <span onClick={() => changeFolderName(e.folderId)}>{e.folderName}</span>
                                    </div>
                                )
                            }
                            else {
                                return null;
                            }
                        })}
                    </div>
                    <div className="storage__settings">
                        <div className="navigation__menu">
                            <div onClick={() => history("/Profile")} className='item'>Мой профиль</div>
                            <div onClick={() => history("/Statistic")} className='item'>Cтатистика</div>
                            <div onClick={createFolder} className="item">Создать папку</div>
                            <div onClick={showMemoryModal} className="item__share">Share memory</div>
                            <div onClick={openUserBacket} className="item">Корзина <img src = {backetFile} width={"20px"} height={"20px"}></img></div>
                         </div>
                        <div className="header">Вместимость хранилища</div>
                        <ProgressBar max = {userMemory} percentageNew={sizeOfUserFiles} />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserStore;
