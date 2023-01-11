import './errorBox.scss';




function ErrorBox({text, showModal}) {
  
    return (
        <div className="ErrorBox">
            <text className='error__text'>
                <closebutton onClick = {showModal}>x</closebutton>
                {text}
            </text>
        </div>
    );
}


export default ErrorBox;
