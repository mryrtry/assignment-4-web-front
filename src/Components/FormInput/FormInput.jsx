import { AnimatePresence, motion } from "framer-motion";
import style from "./form_input.module.css";

export default function ModalInput({
  register,
  type,
  errors,
  placeholder,
  label,
  description,
}) {
  return (
    <>
      <label className={style.modal_input_field}>
        <p className={style.modal_input_label}>{label}</p>
        <p className={style.modal_input_description}>{description}</p>
        <input
          type={type}
          className={style.modal_input}
          placeholder={placeholder}
          {...register}
        />
      </label>
      <div className={style.modal_input_error_block}>
        <AnimatePresence>
          {errors && (
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}>
              {errors?.message ||
                "Неизвестная ошибка ввода."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
