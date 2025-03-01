import { AnimatePresence, motion } from "framer-motion";
import style from "./loader.module.css";

export default function Loader({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={style.loader}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}>
          <motion.div className={style.loader_inner}></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
