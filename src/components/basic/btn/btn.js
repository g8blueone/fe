import styles from "./btn.module.css"

export function CustomButton({title, type}) {

    return (
        <button className={`${styles[type]}`}>
            {title}
        </button>
    );
}