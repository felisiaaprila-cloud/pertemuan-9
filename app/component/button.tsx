import styles from "../styles/button.module.css"; // IMPORT KE MODULE.CSS

export default function Button({ label }: { label: string }) {
    return (
        <button className={styles.primary}>
            {label}
        </button>
    );
}