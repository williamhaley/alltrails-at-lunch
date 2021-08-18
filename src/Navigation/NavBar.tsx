import Sort from './Sort';
import Search from './Search';

const NavBar: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <nav
      className={`${props.className} d-flex navbar navbar-expand-lg navbar-light bg-white justify-content-between shadow-sm`}
    >
      <div className="container-fluid justify-content-center justify-content-sm-between">
        <a
          className="navbar-brand d-flex justify-content-center justify-content-sm-start"
          href="/"
        >
          <img src="/logo.svg" alt="AllTrails logo" />{' '}
          <span className="ms-2 fs-4 text-muted">at Lunch</span>
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
