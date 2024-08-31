import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/PrioritySelector.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Selector({ priority = null, onPriorityChange, readOnly = false }) {
    const [currentlySelected, setCurrentlySelected] = useState(priority);

    const handleOptionClick = (event) => {
        if(readOnly) return;

        setCurrentlySelected(parseInt(event.target.getAttribute('value')));
        return onPriorityChange(parseInt(event.target.getAttribute('value')));
    }

    return (
        <div className={styles.priority__selector}>
            <ul className={styles.priority__selector__list}>
                <li value="1" className={ currentlySelected === 1 ? styles.active : '' } onClick={handleOptionClick}><FontAwesomeIcon icon={fa1} /> Low</li>
                <li value="2" className={ currentlySelected === 2 ? styles.active : '' } onClick={handleOptionClick}><FontAwesomeIcon icon={fa2} /> Medium</li>
                <li value="3" className={ currentlySelected === 3 ? styles.active : '' } onClick={handleOptionClick}><FontAwesomeIcon icon={fa3} /> High</li>
            </ul>
        </div>
    );
}

export default Selector;