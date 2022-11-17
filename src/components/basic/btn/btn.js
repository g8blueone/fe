import styles from "./btn.module.css"

export function CustomButton({title, type, handler}) {

    

    return (
        <button className={`${styles[type]}`} onClick={handler}>
            {title}
        </button>
    );
}