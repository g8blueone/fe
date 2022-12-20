import styles from "./input.module.css"

export function CustomInput({ type, hint,value, onChangeHandler, disabled }) {
    return (
        <input
            disabled={disabled}
            type={`${type}`}
            className={`${styles["formInput"]}`}
            placeholder={`${hint}`}
            value={value}
            onChange={onChangeHandler}
        />
    );
}