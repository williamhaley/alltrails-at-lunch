import { useState } from 'react';
import Map from '../Map/Map';
import NavBar from '../Navigation/NavBar';
import GoogleProvider from '../Google/GoogleProvider';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { getCurrentLocation } from '../store/slices/location';
import './App.scss';
import styles from './App.module.scss';
import List from '../List/List';

// Immediate loading once the app is booted.
store.dispatch(getCurrentLocation());

function App() {
  const [mobileShowList, setMobileShowList] = useState(false);

  return (
    <Provider store={store}>
      <GoogleProvider>
        <div className={`container ${styles.container}`}>
          <NavBar className={styles.nav} />

          {/* On larger viewports always show these views (d-sm-block) using
          their column proportions, but on smaller viewports allow explicitly
          hiding them. */}
          <div className="row">
            <List
              className={`d-sm-block col-sm-3 ${!mobileShowList && 'd-none'}`}
            />
            <Map className={`d-sm-block col ${mobileShowList && 'd-none'}`} />
          </div>

          {/* This button is only visible on mobile */}
          <button
            className="d-sm-none"
            onClick={() => {
              setMobileShowList(!mobileShowList);
            }}
          >
            {mobileShowList ? 'Map' : 'List'}
          </button>
        </div>
      </GoogleProvider>
    </Provider>
  );
}

export default App;
