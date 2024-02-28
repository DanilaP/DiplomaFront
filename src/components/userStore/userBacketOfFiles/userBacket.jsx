import './userBacket.scss';
import $api from '../../../api';
import { useEffect } from 'react';
import SERVADRESS from "../../servAdress";
import { useState } from 'react';
import pdficon from '../../../Images/pdf.png';
import excelicon from '../../../Images/excel.png';
import wordicon from '../../../Images/word.png';
import backetFile from '../../../Images/backet_file.png';
import audioIcon from '../../../Images/audioIcon.png';
import videoicon from '../../../Images/videopng.png';
import zipImage from '../../../Images/allFilesIcon.png';
import folderImage from '../../../Images/folderImage.png';

function UserBacket({close, currentFolderId}) {
    const [userData, setUserData] = useState({});

    const recoverFile = async (file) => {
        let folder = file;
        if (file.hasOwnProperty('isDeleted')) {
            await $api.post(SERVADRESS + "/files/recoverFolderFromBacket", {folder})
            .then((res) => {
                setUserData({...userData, backet: res.data.backet});
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            await $api.post(SERVADRESS + "/files/recoverUserFile", {file})
            .then((res) => {
                setUserData({...userData, backet: res.data.backet});
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        } 
    }
    const deleteFile = async (file) => {
        if (file.hasOwnProperty('isDeleted')) {
            await $api.post(SERVADRESS + '/files/deleteFolder', {folderId: file.folderId, parentFolderId: currentFolderId})
            .then((res) => {
                setUserData({...userData, backet: res.data.backet});
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            await $api.post(SERVADRESS + "/files/deleteFileFromBacket", {file})
            .then((res) => {
                setUserData({...userData, backet: res.data.backet});
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    useEffect(() => {
        $api.get(SERVADRESS + '/auth/getUserData')
        .then((res) => {
            setUserData(res.data.userData);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className="backet">
            <div className="backet__main">
                <div onClick={close} className='close__button'>x</div>
                {
                    userData?.backet?.length > 0 ? 
                    null
                    : <h3>Ваша корзина пуста</h3>
                }
                {
                    userData?.backet?.map((el, index) => {
                        return (
                            <div key={index} className='backet__file'>
                                {   (el.folderName !== undefined) ?
                                        (   
                                            <img src = {folderImage} width={"25px"} height={"25px"} />
                                        )
                                        :
                                    (el.type.indexOf('image') > -1) ? 
                                        (
                                            <img src = {el.path} width={"25px"} height={"25px"} />
                                        )
                                    : (el.type.indexOf('video') > -1) ? 
                                        (
                                            <img src = {videoicon} width={"25px"} height={"25px"} />
                                        )
                                    : (el.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') > -1)
                                     || (el.type.indexOf('application/msword') > -1) ? 
                                        (
                                            <img src = {wordicon} width={"25px"} height={"25px"} />
                                        )
                                        : (el.type.indexOf('application/pdf') > -1) ? 
                                        (
                                            <img src = {pdficon} width={"25px"} height={"25px"} />
                                        )
                                        : (el.type.indexOf('application/vnd.ms-excel') > -1) ?
                                        (
                                            <img src = {excelicon} width={"25px"} height={"25px"} />
                                        )
                                        : (el.type.indexOf('audio') > -1) ? 
                                        (
                                            <img src = {audioIcon} width={"25px"} height={"25px"} />
                                        )
                                        : (el.type.indexOf('zip') > -1) ? 
                                        (
                                            <img src = {zipImage} width={"25px"} height={"25px"} />
                                        ) 
                                        : null
                                }
                                <div className='file__name'>{el.fileName || el.folderName}</div>
                                <div className="backet__settings">
                                    <div onClick={() => recoverFile(el)}>Восстановить</div>
                                    <div onClick={() => deleteFile(el)}>Удалить</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default UserBacket;
