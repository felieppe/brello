import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react";

import Header from "../components/header";
import NewTask from "../modals/newTask";
import Task from "../modals/task";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPlus, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { fetchTasks, fetchMembers, fetchColumns, createTask, createColumn } from '../utils/api';

function Home({ endpointTasks = {}, endpointMembers = {}, endpointColumns = {} }) {
    /*
    
        Column Example: 
        {
            id: 1,
            name: "Column 1"
        }

        Task Example:
        {
            id: 1,
            title: "Task 1",
            description: "",
            assigned: "",
            priority: 0,
            state: "",
            limit: ""
        }

    */
    const [columns, setColumns] = useState([]); 
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [actualTheme, setActualTheme] = useState('light');

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showingTask, setShowingTask] = useState({});
    const [newTaskModalData, setNewTaskModalData] = useState({});
    const [isAddingColumn, setIsAddingColumn] = useState(false);

    const priorityColors = ["transparent", "#37ab2c", "#c9b51b", "#ab2c2c"]     //  0: No Priority, 1: Low, 2: Medium, 3: High

    const handleTaskClick = (event) => {
        let taskId = event.target.closest('div.'+styles.task).getAttribute('id');
        let task = tasks.find((t) => t.id === taskId);
        
        setShowingTask(task);
        setShowTaskModal(true);
    }

    const handleAddClick = (event) => {
        let column_id = event.target.closest('div').getAttribute('column_id');
        
        setNewTaskModalData({id: column_id});
        setShowNewTaskModal(true);
    }

    const handleSaveTask = (task) => {
        createTask(task).then((response) => {
            task.id = response.id;
            setTasks([...tasks, task]);
        }).catch((err) => { console.log(err) });
        
        setShowNewTaskModal(false);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();

        let taskId = event.dataTransfer.getData("text/plain");
        let task = tasks.find((t) => t.id == taskId);

        task.state = event.target.closest('div').getAttribute('column_id');

        setTasks([...tasks]);
    }

    const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    const handleAddColumn = (event) => {
        event.preventDefault();

        let name = event.target.querySelector('input').value;

        if(name.length > 0) {
            let task = {name: name};
            createColumn(task).then((response) => {
                task.id = response.id;
                setColumns([...columns, task]);
            }).catch((err) => { console.log(err) });

            setIsAddingColumn(false);
        }
    }

    const handleAddMembers = (event) => {
        alert('Add Member');
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { setActualTheme('dark'); }
        }
    }, []);
    
    useEffect(() => {
        setTasks(endpointTasks);
        setMembers(endpointMembers);
        setColumns(endpointColumns);

    }, [endpointTasks, endpointMembers, endpointColumns]);

    return (
        <main>
            { (showNewTaskModal && showTaskModal == false) && <NewTask theme={actualTheme} column={newTaskModalData} members={members} onSave={ handleSaveTask } onCancel={() => { setShowNewTaskModal(false) }}/>}
            { (showTaskModal && showNewTaskModal == false) && <Task theme={actualTheme} task={showingTask} members={members} onCancel={() => { setShowTaskModal(false) }}/> }


            <Header theme={actualTheme} onThemeChange={(t) => { setActualTheme(t) }}/>

            <div className={styles.board} style={{"backgroundColor": actualTheme === 'dark' ? "#191f2a" : ""}}>
                <div className={styles.board__header} style={{"backgroundColor": actualTheme === 'dark' ? "#15181ee6" : ""}}>
                    <h1>Board Name</h1>

                    <div className={styles.board__header__add}>
                        <button className='button is-small' onClick={handleAddMembers}><FontAwesomeIcon icon={faUser} /> Add Members</button>
                    </div>
                </div>

                <div className={styles.board__content} style={{"backgroundColor": actualTheme === 'dark' ? "#191f2a" : "", "backgroundBlendMode": actualTheme === 'dark' ? "darken" : ""}}>

                    {columns.map((column) => {
                        return (
                            <div className={styles.board__content__column} key={column.id} onDragOver={handleDragOver} onDrop={handleDrop} style={{backgroundColor: actualTheme === 'dark' ? "#101204" : ""}}>
                                <div className={styles.column__header} style={{color: actualTheme === 'dark' ? "#B6C2CF" : ""}}>
                                    {column.name}
                                </div>

                                {tasks.filter((t) => t.state == column.id).map((task) => {
                                    return (
                                        <div className={styles.task} key={task.id} id={task.id} draggable={true} onDragStart={handleDragStart} onClick={handleTaskClick} style={{backgroundColor: actualTheme === 'dark' ? "#22272B" : "", color: actualTheme === 'dark' ? "#B6C2CF" : ""}}>
                                            <div className={styles.task__title}>
                                                <p>{task.title}</p>
                                                
                                                { task.priority > 0 ? <div className={styles.task__title__priority} style={{"backgroundColor": priorityColors[task.priority]}}/> : null}
                                            </div>

                                            <ul className={styles.task__features}>
                                                {task.description !== undefined && task.description.length !== 0 ? <li><FontAwesomeIcon icon={faAlignLeft} style={{color: actualTheme === 'dark' ? "#B6C2CF" : ""}} /></li> : null}
                                                {task.assigned.length !== 0 ? <li><FontAwesomeIcon icon={faUser} style={{color: actualTheme === 'dark' ? "#B6C2CF" : ""}} /></li> : null}
                                            </ul>
                                        </div>
                                    );
                                })}

                                <div className={styles.column__add} key={column.id} column_id={column.id} onClick={handleAddClick}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>Add a task</p>
                                </div>       
                            </div>
                        );
                    })}

                    { !isAddingColumn && <div className={styles.board__content__add} onClick={ () => { setIsAddingColumn(true) } } style={{"backgroundColor": actualTheme === 'dark' ? "#0000003d" : ""}}>
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add another list</p>
                    </div> }

                    { isAddingColumn && <div className={styles.board__content__add__form} style={{backgroundColor: actualTheme === "dark" ? "#131820" : ""}}>
                        <form onSubmit={handleAddColumn}>
                            <input className="input is-small" type="text" placeholder='Enter list name...' style={{color: actualTheme === "dark" ? "white" : ""}} /> <br />
                            <button>Add list</button>
                            <FontAwesomeIcon icon={faXmark} onClick={() => { setIsAddingColumn(false) }} style={{color: actualTheme === "dark" ? "white" : ""}}/>
                        </form>
                    </div>}
                </div>
            </div>
        </main>
    );
}

export default Home;

export async function getServerSideProps() {
    const tasks = await fetchTasks({}).catch((err) => { if (err["code"] === 404) { return [] } });
    const members = await fetchMembers({}).catch((err) => { if (err["code"] === 404) { return [] } });
    const columns = await fetchColumns({}).catch((err) => { if (err["code"] === 404) { return [] } });

    return { props: { endpointTasks: (tasks != undefined ? tasks : []), endpointMembers: (members != undefined ? members : []), endpointColumns: (columns != undefined ? columns : []) } }
}