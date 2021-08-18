import styles from './NavBar.module.scss';
import Sort from './Sort';
import Search from './Search';

const NavBar: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <nav
      className={`${props.className} navbar navbar-expand-lg navbar-light bg-white shadow-sm ${styles.nav}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex justify-center" href="/">
          <img src="/logo.svg" alt="AllTrails logo" />{' '}
          <span className="ms-2 fs-4">at Lunch</span>
        </a>

        <div className="d-flex">
          <Sort />

          <Search />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
