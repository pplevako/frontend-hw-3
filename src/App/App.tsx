import Header from '@components/Header';
import { useStore } from '@stores/context';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

import styles from './App.module.scss';

function App() {
  const { categoriesStore } = useStore();

  useEffect(() => {
    categoriesStore.fetchCategories();
  }, [categoriesStore]);

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
