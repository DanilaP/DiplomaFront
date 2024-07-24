import './progressBar.scss';

function ProgressBar({max, percentageNew}) {
    return (
        <div className="ProgressBar">
            <div className="bar__header">Вместимость хранилища</div>
            <progress max={max} value={percentageNew}></progress>
            <span>{percentageNew} из {max} mb</span>
        </div>
    );
}
export default ProgressBar;

