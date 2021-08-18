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
        <div className="vw-100 vh-100 bg-light">
          <div className={`container h-100 ${styles.container}`}>
            <NavBar className={styles.nav} />

            <main className={`${styles.main} overflow-hidden h-100`}>
              <div className="row h-100">
                {/* On larger viewports always show these views (d-sm-block) using
                their column proportions, but on smaller viewports allow explicitly
                hiding them. */}
                <List
                  className={`p-3 bg-light d-sm-block col-sm-4 ${
                    !mobileShowList && 'd-none'
                  }`}
                />
                <Map
                  className={`d-sm-block col ${mobileShowList && 'd-none'}`}
                />
              </div>

              {/* This button is only visible on mobile */}
              <button
                className="btn btn-primary d-sm-none mb-3 position-fixed start-50 fixed-bottom translate-middle"
                onClick={() => {
                  setMobileShowList(!mobileShowList);
                }}
              >
                <i
                  className={`bi bi-${mobileShowList ? 'geo-alt' : 'list-ul'}`}
                ></i>
                {mobileShowList ? 'Map' : 'List'}
              </button>
            </main>
          </div>
        </div>
      </GoogleProvider>
    </Provider>
  );
}

export default App;
