/* eslint-disable react/react-in-jsx-scope */
import styles from "../styles/css/Home.module.css";
import GridSetup from "../components/GridSetup.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <GridSetup />
    </div>
  );
}
