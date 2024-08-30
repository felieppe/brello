import styles from '../styles/Home.module.css'

import { useState } from "react";

import Header from "../components/header";
import NewTask from "../modals/newTask";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

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
    const [members, setMembers] = useState([{id: 1, name: "Felipe Cabrera", pfp: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_jakesully_16x9_1098_02_b13c4171.jpeg"}]);

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTaskModalData, setNewTaskModalData] = useState({});
    const [isAddingColumn, setIsAddingColumn] = useState(false);

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
            let id = columns.length + 1;

            setColumns([...columns, {id: id, name: name}]);
            setIsAddingColumn(false);
        }
    }

    return (
        <main>
            {showNewTaskModal && <NewTask column={newTaskModalData} members={members} onSave={ handleSaveTask } onCancel={() => { setShowNewTaskModal(false) }}/>}

            <Header />

            <div className={styles.board}>
                <div className={styles.board__header}>
                    <h1>Board Name</h1>
                </div>

                <div className={styles.board__content}>

                    {columns.map((column) => {
                        return (
                            <div className={styles.board__content__column} key={column.id} onDragOver={handleDragOver} onDrop={handleDrop}>
                                <div className={styles.column__header}>
                                    {column.name}
                                </div>

                                {tasks.filter((t) => t.state == column.id).map((task) => {
                                    return (
                                        <div className={styles.task} key={task.id} id={task.id} draggable={true} onDragStart={handleDragStart}>
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

                    { !isAddingColumn && <div className={styles.board__content__add} onClick={ () => { setIsAddingColumn(true) } }>
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add another list</p>
                    </div> }

                    { isAddingColumn && <div className={styles.board__content__add__form}>
                        <form onSubmit={handleAddColumn}>
                            <input className="input is-small" type="text" placeholder='Enter list name...'/> <br />
                            <button>Add list</button>
                            <FontAwesomeIcon icon={faXmark} onClick={() => { setIsAddingColumn(false) }}/>
                        </form>
                    </div>}
                </div>
            </div>
        </main>
    );
}

export default Home;