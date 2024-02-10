'use client'

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  /** niceページへ遷移 */
  const navigateToNice = () => {
    router.push("/nice");
  };

  return (
    <main className={styles.main}>
      <div>This is Top-Page</div>
      <button onClick={navigateToNice}>Go to Nice Page</button>
    </main>
  );
}
