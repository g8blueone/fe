import styles from "./input.module.css"

export function CustomInput({type, hint}) {
    return (
        <input type={`${type}`} className={`${styles["formInput"]}`} placeholder={`${hint}`}/>
    );
}