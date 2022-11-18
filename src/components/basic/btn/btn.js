import styles from "./btn.module.css"

export function CustomButton({ title, styleClass, type, handler }) {

    return (
        <button
            className={`${styles[styleClass]}`}
            type={type}
            onClick={handler}
        >
            {title}
        </button>
    );
}