import styles from "./input.module.css"

export function CustomInput({ type, hint, onChangeHandler }) {
    return (
        <input
            type={`${type}`}
            className={`${styles["formInput"]}`}
            placeholder={`${hint}`}
            onChange={onChangeHandler}
        />
    );
}