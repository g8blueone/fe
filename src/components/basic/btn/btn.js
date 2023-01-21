import styles from "./btn.module.css";

export function CustomButton({ title, styleClass, type, handler, disabled }) {
  return (
    <button
      className={`${styles[styleClass]}`}
      type={type}
      onClick={handler}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
