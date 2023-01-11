import './errorModalBox.scss';

function ModalBoxError({text, show}) {
    const close = () => {
        show();
    }
    return (
        <div className="ErrorModalBox">
            <div className="content">
                <div className='content__error'>{text}</div>
                <div onClick={close} className="close__button">x</div>
            </div>
        </div>
    );
}

export default ModalBoxError;
