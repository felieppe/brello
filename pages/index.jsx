import styles from '../styles/Home.module.css'

import Header from "../components/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Home() {
    return (
        <main>
            <Header />

            <div className={styles.board}>
                <div className={styles.board__header}>
                    <h1>Board Name</h1>
                </div>

                <div className={styles.board__content}>
                    <div className={styles.board__content__column}>
                        <div className={styles.column__header}>
                            Backlog
                        </div>

                        <div className={styles.column__content}></div>

                        <div className={styles.column__add}>
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add a task</p>
                        </div>       
                    </div>

                    <div className={styles.board__content__column}>
                        <div className={styles.column__header}>
                            To Do
                        </div>

                        <div className={styles.column__content}></div>

                        <div className={styles.column__add}>
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add a task</p>
                        </div>       
                    </div>

                    <div className={styles.board__content__column}>
                        <div className={styles.column__header}>
                            In Progress
                        </div>

                        <div className={styles.column__content}></div>

                        <div className={styles.column__add}>
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add a task</p>
                        </div>       
                    </div>

                    <div className={styles.board__content__column}>
                        <div className={styles.column__header}>
                            Blocked
                        </div>

                        <div className={styles.column__content}></div>

                        <div className={styles.column__add}>
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add a task</p>
                        </div>       
                    </div>

                    <div className={styles.board__content__column}>
                        <div className={styles.column__header}>
                            Done
                        </div>

                        <div className={styles.column__content}></div>

                        <div className={styles.column__add}>
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add a task</p>
                        </div>       
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;