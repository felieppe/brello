import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/PrioritySelector.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

function Selector({ theme = "light", priority = null, onPriorityChange, readOnly = false }) {
    const [currentlySelected, setCurrentlySelected] = useState(priority);
    const [actualTheme, setActualTheme] = useState(theme);
    const [isHovered, setIsHovered] = useState(0);

    useEffect(() => {
        setActualTheme(theme);
    }, [theme]);

    const handleOptionClick = (event) => {
        if(readOnly) return;

        setCurrentlySelected(parseInt(event.target.getAttribute('value')));
        return onPriorityChange(parseInt(event.target.getAttribute('value')));
    }

    const handleHoverEnter = (event) => {
        let id = parseInt(event.target.getAttribute('value'));
        setIsHovered(id);
    }

    const handleHoverLeave = (event) => {
        let id = parseInt(event.target.getAttribute('value'));
        setIsHovered(0);
    }

    return (
        <div className={styles.priority__selector} style={{backgroundColor: actualTheme === "dark" ? "#282c32" : "", color: actualTheme === "dark" ? "white" : "", borderBottomLeftRadius: actualTheme === "dark" ? "5px" : "", borderBottomRightRadius: actualTheme === "dark" ? "5px" : ""}}>
            <ul className={styles.priority__selector__list}>
                <li value="1" className={ currentlySelected === 1 ? styles.active : '' } onClick={handleOptionClick} style={{"backgroundColor": isHovered === 1 && actualTheme === "dark" ? "#222529" : ""}} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}><FontAwesomeIcon icon={fa1} /> Low</li>
                <li value="2" className={ currentlySelected === 2 ? styles.active : '' } onClick={handleOptionClick} style={{"backgroundColor": isHovered === 2 && actualTheme === "dark" ? "#222529" : ""}} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}><FontAwesomeIcon icon={fa2} /> Medium</li>
                <li value="3" className={ currentlySelected === 3 ? styles.active : '' } onClick={handleOptionClick} style={{"backgroundColor": isHovered === 3 && actualTheme === "dark" ? "#222529" : ""}} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}><FontAwesomeIcon icon={fa3} /> High</li>
            </ul>
        </div>
    );
}

export default Selector;