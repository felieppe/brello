import styles from '../styles/components/Header.module.css'

import Image from 'next/image'

import Logo from '../public/logow.svg'
import Link from 'next/link';

function Header() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__logo}>
                    <Link href="/">
                        <Image src={Logo.src} alt="Logo of Brello" width="80" height="1"/>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header;