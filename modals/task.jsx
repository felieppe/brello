import styles from '../styles/modals/Task.module.css'
import { faCalendarDay, faGauge, faHeading, faParagraph, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import MembersSelector from '../components/membersSelector';
import PrioritySelector from '../components/prioritySelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Task({ theme = 'light', task = {}, members = {}, onCancel = {} }) {
    const [showMembersSelector, setShowMembersSelector] = useState(false);
    const [showPrioritySelector, setShowPrioritySelector] = useState(false);
    const [actualTheme, setActualTheme] = useState(theme);

    const handleCancel = (event) => { event.preventDefault(); onCancel() }

    useEffect(() => {
        setActualTheme(theme);
    }, [theme]);

    return (
        <div className={styles.modal__container}>
            <div className={styles.modal} style={{"backgroundColor": actualTheme === 'dark' ? "#1c2024" : "" }}>
                <form>
                    <div className={styles.modal__header}>
                        <div className={styles.modal__header__left}>
                            <FontAwesomeIcon icon={faHeading} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}} />
                            <input className="input is-primary" type="text" name="task_name" id="task_name" placeholder='Task Title' defaultValue={task.title} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}} readOnly/>
                        </div>

                        <div className={styles.modal__header__right}>
                            <button onClick={handleCancel}><FontAwesomeIcon icon={faXmark} style={{"color": actualTheme === "dark" ? "white" : ""}}/></button>
                        </div>
                    </div>

                    <div className={styles.modal__content}>
                        <div className={styles.modal__content__left}>
                            <div className={styles.description}>
                                <div className={styles.description__icon}>
                                    <FontAwesomeIcon icon={faParagraph} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}} />
                                    <p style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}>Description</p>
                                </div>

                                <div className={styles.description__box}>
                                    <textarea className='textarea' name="task_description" id="task_description" placeholder='Task Description' defaultValue={task.description} style={{"color": actualTheme === "dark" ? "#b6c2cf" : "", "backgroundColor": actualTheme === "dark" ? "#272c31" : ""}} readOnly></textarea>
                                </div>
                            </div>

                            <div className={styles.endtime}>
                                <div className={styles.endtime__icon}>
                                    <FontAwesomeIcon icon={faCalendarDay} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/>
                                    <p style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}>End Time</p>
                                </div>

                                <div className={styles.endtime__box}>
                                    <input className="input is-small" type="date" name="task_endtime" id="task_endtime" value={new Date(task.limit).toISOString().slice(0, 10)} style={{"color": actualTheme === "dark" ? "#b6c2cf" : "", "backgroundColor": actualTheme === "dark" ? "#272c31" : ""}} readOnly/>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modal__content__right}>
                            <p style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}>Options</p>
                            <ul>
                                <li>
                                    <div onClick={() => { setShowMembersSelector(!showMembersSelector) }} style={{"backgroundColor": actualTheme === "dark" ? "#ffffff0f" : "", "borderRadius": actualTheme === "dark" ? "0.5rem" : ""}}><a className='button is-small is-dark' style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}><FontAwesomeIcon icon={faUser} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/> Members</a></div>
                                    {showMembersSelector && <MembersSelector theme={actualTheme} members={members.filter((m) => task.assigned.includes(m.id))} onCancel={() => { setShowMembersSelector(false); }} readOnly/> }
                                </li>
                                <li>
                                    <div onClick={() => { setShowPrioritySelector(!showPrioritySelector) }} style={{"backgroundColor": actualTheme === "dark" ? "#ffffff0f" : "", "borderRadius": actualTheme === "dark" ? "0.5rem" : ""}}><a className='button is-small is-dark' style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}> <FontAwesomeIcon icon={faGauge} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/> Priority</a></div>
                                    {showPrioritySelector && <PrioritySelector theme={actualTheme} priority={task.priority} readOnly/> }
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Task;