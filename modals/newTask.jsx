import { faCalendarDay, faGauge, faHeading, faParagraph, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/modals/newTask.module.css';

import { useEffect, useState } from 'react';
import MembersSelector from '../components/membersSelector';
import PrioritySelector from '../components/prioritySelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NewTask({ theme = 'light', column, members, onCancel, onSave }) {
    const [showMembersSelector, setShowMembersSelector] = useState(false);
    const [showPrioritySelector, setShowPrioritySelector] = useState(false);
    const [newMembers, setNewMembers] = useState([]);
    const [newPriority, setNewPriority] = useState(0);
    const [actualTheme, setActualTheme] = useState(theme);

    const clearInputs = () => {
        document.getElementById('task_name').value = '';
        document.getElementById('task_description').value = '';
        document.getElementById('task_endtime').value = '';
    }

    useEffect(() => {
        setActualTheme(theme);
    }, [theme])

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
            title: task_name,
            description: task_description,
            assigned: [...newMembers],
            priority: parseInt(newPriority),
            state: column.id,
            limit: task_endtime
        }

        clearInputs();
        onSave(task);
    }

    const handleCancel = (event) => { event.preventDefault(); clearInputs(); onCancel() }

    return (
        <div className={styles.modal__container}>
            <div className={styles.modal} style={{"backgroundColor": actualTheme === 'dark' ? "#1c2024" : "" }}>
                <form>
                    <div className={styles.modal__header}>
                        <div className={styles.modal__header__left}>
                            <FontAwesomeIcon icon={faHeading} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/>
                            <input className="input is-primary" type="text" name="task_name" id="task_name" placeholder='Task Title' style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}} required/>
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
                                    <textarea className='textarea' name="task_description" id="task_description" placeholder='Task Description' style={{"color": actualTheme === "dark" ? "#b6c2cf" : "", "backgroundColor": actualTheme === "dark" ? "#272c31" : ""}}></textarea>
                                </div>
                            </div>

                            <div className={styles.endtime}>
                                <div className={styles.endtime__icon}>
                                    <FontAwesomeIcon icon={faCalendarDay} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/>
                                    <p style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}>End Time</p>
                                </div>

                                <div className={styles.endtime__box}>
                                    <input className="input is-small" type="date" name="task_endtime" id="task_endtime" style={{"color": actualTheme === "dark" ? "#b6c2cf" : "", "backgroundColor": actualTheme === "dark" ? "#272c31" : ""}} required/>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modal__content__right}>
                            <p style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}>Options</p>
                            <ul>
                                <li>
                                    <div onClick={() => { setShowMembersSelector(!showMembersSelector) }} style={{"backgroundColor": actualTheme === "dark" ? "#ffffff0f" : "", "borderRadius": actualTheme === "dark" ? "0.5rem" : ""}}><a className='button is-small is-dark' style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}><FontAwesomeIcon icon={faUser} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/> Members</a></div>
                                    {showMembersSelector && <MembersSelector theme={actualTheme} members={members} onAddMember={ handleMemberAdd } onRemoveMember={ handleMemberRemove } onCancel={() => { setShowMembersSelector(false); }} /> }
                                </li>
                                <li>
                                    <div onClick={() => { setShowPrioritySelector(!showPrioritySelector) }} style={{"backgroundColor": actualTheme === "dark" ? "#ffffff0f" : "", "borderRadius": actualTheme === "dark" ? "0.5rem" : ""}}><a className='button is-small is-dark' style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}> <FontAwesomeIcon icon={faGauge} style={{"color": actualTheme === "dark" ? "#b6c2cf" : ""}}/> Priority</a></div>
                                    {showPrioritySelector && <PrioritySelector theme={actualTheme} priority={newPriority} onPriorityChange={ handlePriorityChange }/> }
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