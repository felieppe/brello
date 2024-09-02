import styles from '../styles/components/Header.module.css'

import Image from 'next/image'

import Logo from '../public/logow.svg'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function Header({ theme = 'light', onThemeChange = {} }) {
    const [actualTheme, setActualTheme] = useState(theme);

    const handleChangeTheme = () => {
        let newTheme = actualTheme === 'light' ? 'dark' : 'light';

        setActualTheme(newTheme);
        onThemeChange(newTheme);
    }

    useEffect(() => {
        setActualTheme(theme);
    }, [theme]);

    return (
        <>
            <div className={styles.header} style={{"backgroundColor": actualTheme === 'dark' ? "#1D2125" : "" }}>
                <div className={styles.header__logo}>
                    <Link href="/">
                        <Image src={Logo.src} alt="Logo of Brello" width="80" height="1"/>
                    </Link>
                </div>

                <div className={styles.header__theme}>
                    <button onClick={handleChangeTheme}>{ actualTheme === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} /> }</button>  
                </div>
            </div>
        </>
    )
}

export default Header;