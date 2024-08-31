import styles from '../styles/modals/Task.module.css'
import { faCalendarDay, faGauge, faHeading, faParagraph, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import MembersSelector from '../components/membersSelector';
import PrioritySelector from '../components/prioritySelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Task({ task = {}, members = {}, onCancel = {} }) {
    const [showMembersSelector, setShowMembersSelector] = useState(false);
    const [showPrioritySelector, setShowPrioritySelector] = useState(false);

    const handleCancel = (event) => { event.preventDefault(); onCancel() }

    return (
        <div className={styles.modal__container}>
            <div className={styles.modal}>
                <form>
                    <div className={styles.modal__header}>
                        <div className={styles.modal__header__left}>
                            <FontAwesomeIcon icon={faHeading} />
                            <input className="input is-primary" type="text" name="task_name" id="task_name" placeholder='Task Title' defaultValue={task.title} readOnly/>
                        </div>

                        <div className={styles.modal__header__right}>
                            <button onClick={handleCancel}><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                    </div>

                    <div className={styles.modal__content}>
                        <div className={styles.modal__content__left}>
                            <div className={styles.description}>
                                <div className={styles.description__icon}>
                                    <FontAwesomeIcon icon={faParagraph} />
                                    <p>Description</p>
                                </div>

                                <div className={styles.description__box}>
                                    <textarea className='textarea' name="task_description" id="task_description" placeholder='Task Description' defaultValue={task.description} readOnly></textarea>
                                </div>
                            </div>

                            <div className={styles.endtime}>
                                <div className={styles.endtime__icon}>
                                    <FontAwesomeIcon icon={faCalendarDay} />
                                    <p>End Time</p>
                                </div>

                                <div className={styles.endtime__box}>
                                    <input className="input is-small" type="date" name="task_endtime" id="task_endtime" value={new Date(task.limit).toISOString().slice(0, 10)} readOnly/>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modal__content__right}>
                            <p>Options</p>
                            <ul>
                                <li>
                                    <div onClick={() => { setShowMembersSelector(!showMembersSelector) }}><a className='button is-small is-dark'><FontAwesomeIcon icon={faUser}/> Members</a></div>
                                    {showMembersSelector && <MembersSelector members={members.filter((m) => task.asigned.includes(m.id))} onCancel={() => { setShowMembersSelector(false); }} readOnly/> }
                                </li>
                                <li>
                                    <div onClick={() => { setShowPrioritySelector(!showPrioritySelector) }}><a className='button is-small is-dark'> <FontAwesomeIcon icon={faGauge} /> Priority</a></div>
                                    {showPrioritySelector && <PrioritySelector priority={task.priority} readOnly/> }
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