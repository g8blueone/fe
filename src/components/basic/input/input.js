import styles from "./input.module.css"

export function CustomInput({ type, hint,value, onChangeHandler }) {
    return (
        <input
            type={`${type}`}
            className={`${styles["formInput"]}`}
            placeholder={`${hint}`}
            value={value}
            onChange={onChangeHandler}
        />
    );
}