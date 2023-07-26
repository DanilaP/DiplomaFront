import './errorBox.scss';




function ErrorBox({text, showModal}) {
  
    return (
        <div className="ErrorBox">
            <div className='error__text'>
                <div className='closebutton' onClick = {showModal}>x</div>
                {text}
            </div>
        </div>
    );
}


export default ErrorBox;
