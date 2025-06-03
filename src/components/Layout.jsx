import styles from './styles/layout.module.css';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className={styles.layoutRoot}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
