
import styles from "./page.module.css";
import UseHook from './useHook/page'
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UseHook/>
      </main>
    </div>
  );
}
