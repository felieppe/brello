import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/MembersSelector.module.css';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Selector({ theme = "light", members = {}, onCancel, onAddMember, onRemoveMember, readOnly = false }) {
    const [isRemoveVisible, setIsRemoveVisible] = useState([]);
    const [actualTheme, setActualTheme] = useState(theme);

    useEffect(() => {
        setActualTheme(theme);
    }, [theme])

    const handleMemberClick = (event) => {
        if (readOnly) return;

        event.preventDefault()
        let id = parseInt(event.currentTarget.id);

        if (isRemoveVisible.includes(id)) {
            setIsRemoveVisible([...isRemoveVisible.filter((member) => member !== id)]);
            return onRemoveMember(id);
        } else { setIsRemoveVisible([...isRemoveVisible, id]); return onAddMember(id); }
    }

    return (
        <div className={styles.members__selector} style={{"backgroundColor": actualTheme === "dark" ? "#272c31" : "", "color": actualTheme === "dark" ? "#b6c2cf" : ""}}>
            <div className={styles.members__selector__header}>
                <p>Members</p>
                <div className={styles.selector__header__exit} onClick={() => { onCancel(); }}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>

            <div className={styles.members__selector__search}>
                <input type="text" name="selectorSearch" id="selectorSearch" placeholder='John Doe' style={{"backgroundColor": actualTheme === "dark" ? "#1c2024" : "", "border": "none", "color": actualTheme === "dark" ? "#b6c2cf" : ""}}/>
            </div>

            <div className={styles.members__selector__list}>
                <p className={styles.selector__list__title}>{ members.length > 0 ? "Available" : "Nobody is available" }</p>

                <div className={styles.list__members}>
                    { members.length > 0 && members.map((member) => {
                        return (
                            <div className={styles.member} key={member.id} id={member.id} onClick={ handleMemberClick }>
                                <div className={styles.member__pfp}>
                                    <Image src={member.pfp} alt={member.name} width={20} height={20}/>
                                </div>
                                
                                <div className={styles.member__name}> <p>{member.name}</p> </div>

                                { isRemoveVisible.includes(member.id) && <div className={styles.member__remove}>
                                    <FontAwesomeIcon icon={faXmark} style={{width: "8px"}}/>
                                </div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Selector;