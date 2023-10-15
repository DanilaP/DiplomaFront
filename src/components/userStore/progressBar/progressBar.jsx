import { useState } from 'react';
import './progressBar.scss';




function ProgressBar({percentageNew}) {
    const [max, setMax] = useState(8192);

    return (
        <div className="ProgressBar">
            <progress max={max} value={percentageNew}></progress>
            <span>{percentageNew} из {max} mb</span>
        </div>
    );
}
export default ProgressBar;

