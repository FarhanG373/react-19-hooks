
import styles from "./page.module.css";
import UseHook from './useHook/page'
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      https://www.youtube.com/watch?v=4JsTCSYst9M ---------------- 17:32 
        <UseHook/>
      </main>
    </div>
  );
}
