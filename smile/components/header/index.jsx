import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../logo';
import Search from '../search';
import Requests from '../requests';
import AuthContext from '../../contexts/authContext';
import styles from './index.module.css';

const Header = () => {
  const user = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <Search />
        <ul className={styles.navIcons}>
          <li>
            <Link href="/">
              <a>
                <Image src="/home.svg" alt="home" width="28" height="28" quality={100} />
              </a>
            </Link>
          </li>
          <li>
            <Requests />
          </li>
          <li>
            <Link href="/add-post">
              <a>
                <Image src="/plus.svg" alt="add post" width="28" height="28" quality={100} />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/user/${user?.username}`}>
              <a>
                <Image src="/user.svg" alt="profile" width="28" height="28" quality={100} />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
