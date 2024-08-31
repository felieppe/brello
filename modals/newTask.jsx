import { faCalendarDay, faGauge, faHeading, faParagraph, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/modals/newTask.module.css';

import { useState } from 'react';
import MembersSelector from '../components/membersSelector';
import PrioritySelector from '../components/prioritySelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { v4: uuidv4 } = require('uuid');

function NewTask({ column, members, onCancel, onSave }) {
    const [showMembersSelector, setShowMembersSelector] = useState(false);
    const [showPrioritySelector, setShowPrioritySelector] = useState(false);
    const [newMembers, setNewMembers] = useState([]);
    const [newPriority, setNewPriority] = useState(0);

    const clearInputs = () => {
        document.getElementById('task_name').value = '';
        document.getElementById('task_description').value = '';
        document.getElementById('task_endtime').value = '';
    }

    const handleMemberAdd = (id) => { setNewMembers([...newMembers, id]); }
    const handleMemberRemove = (id) => { setNewMembers(newMembers.filter((member) => member !== id)); }

    const handlePriorityChange = (priority) => { setNewPriority(priority); setShowPrioritySelector(false); }

    const handleSave = (event) => {
        event.preventDefault();

        let task_name = document.getElementById('task_name').value;
        let task_description = document.getElementById('task_description').value;
        let task_endtime = document.getElementById('task_endtime').valueAsDate;

        if (task_name === '') { alert('Task name is required'); return; }
        if (task_description === '') { alert('Task description is required'); return; }
        if (task_endtime === null) { alert('Task end time is required'); return; }

        let task = {
            id: uuidv4(),
            title: task_name,
            description: task_description,
            asigned: [...newMembers],
            priority: parseInt(newPriority),
            state: parseInt(column.id),
            limit: task_endtime
        }

        clearInputs();
        onSave(task);
    }

    const handleCancel = (event) => { event.preventDefault(); clearInputs(); onCancel() }

    return (
        <div className={styles.modal__container}>
            <div className={styles.modal}>
                <form>
                    <div className={styles.modal__header}>
                        <div className={styles.modal__header__left}>
                            <FontAwesomeIcon icon={faHeading} />
                            <input className="input is-primary" type="text" name="task_name" id="task_name" placeholder='Task Title' required/>
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
                                    <textarea className='textarea' name="task_description" id="task_description" placeholder='Task Description'></textarea>
                                </div>
                            </div>

                            <div className={styles.endtime}>
                                <div className={styles.endtime__icon}>
                                    <FontAwesomeIcon icon={faCalendarDay} />
                                    <p>End Time</p>
                                </div>

                                <div className={styles.endtime__box}>
                                    <input className="input is-small" type="date" name="task_endtime" id="task_endtime" required/>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modal__content__right}>
                            <p>Options</p>
                            <ul>
                                <li>
                                    <div onClick={() => { setShowMembersSelector(!showMembersSelector) }}><a className='button is-small is-dark'><FontAwesomeIcon icon={faUser}/> Members</a></div>
                                    {showMembersSelector && <MembersSelector members={members} onAddMember={ handleMemberAdd } onRemoveMember={ handleMemberRemove } onCancel={() => { setShowMembersSelector(false); }} /> }
                                </li>
                                <li>
                                    <div onClick={() => { setShowPrioritySelector(!showPrioritySelector) }}><a className='button is-small is-dark'> <FontAwesomeIcon icon={faGauge} /> Priority</a></div>
                                    {showPrioritySelector && <PrioritySelector priority={newPriority} onPriorityChange={ handlePriorityChange }/> }
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.modal__buttons}>
                        <button className='button is-success is-dark is-small' onClick={handleSave}>Save</button>
                        <button className='button is-danger is-dark is-small' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewTask;