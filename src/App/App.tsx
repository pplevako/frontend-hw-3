import { Outlet } from 'react-router';

import styles from './App.module.scss';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
