import { Outlet } from 'react-router';

import styles from './App.module.scss';
import Header from './components/Header';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
