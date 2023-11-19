import { useState } from 'react';
import './progressBar.scss';




function ProgressBar({max, percentageNew}) {
    return (
        <div className="ProgressBar">
            <progress max={max} value={percentageNew}></progress>
            <span>{percentageNew} из {max} mb</span>
        </div>
    );
}
export default ProgressBar;

