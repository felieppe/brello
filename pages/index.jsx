import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react";

import Header from "../components/header";
import NewTask from "../modals/newTask";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Home() {
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
            asigned: "",
            priority: 0,
            state: "",
            limit: ""
        }

    */
    const [columns, setColumns] = useState([{id: 1, name: "Backlog"}, {id: 2, name: "To Do"}, {id: 3, name: "In Progress"}, {id: 4, name: "Blocked"}, {id: 5, name: "Done"}]); 
    const [tasks, setTasks] = useState([]);

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTaskModalData, setNewTaskModalData] = useState({});

    const handleAddClick = (event) => {
        let column_id = event.target.closest('div').getAttribute('column_id');
        
        setNewTaskModalData({id: column_id});
        setShowNewTaskModal(true);
    }

    const handleSaveTask = (task) => {
        task.id = tasks.length + 1;

        setTasks([...tasks, task]);
        setShowNewTaskModal(false);
    }

    return (
        <main>
            {showNewTaskModal && <NewTask column={newTaskModalData} onSave={ handleSaveTask } onCancel={() => { setShowNewTaskModal(false) }}/>}

            <Header />

            <div className={styles.board}>
                <div className={styles.board__header}>
                    <h1>Board Name</h1>
                </div>

                <div className={styles.board__content}>

                    {columns.map((column) => {
                        return (
                            <div className={styles.board__content__column} key={column.id}>
                                <div className={styles.column__header}>
                                    {column.name}
                                </div>

                                {tasks.filter((t) => t.state == column.id).map((task) => {
                                    return (
                                        <div className={styles.task} key={task.id}>
                                            <p>{task.title}</p>
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
                </div>
            </div>
        </main>
    );
}

export default Home;