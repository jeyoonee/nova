import { motion, AnimatePresence } from "framer-motion";

export default function OptionDropdown({ options, onSelect }) {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="absolute w-full border z-50 bg-white text-[11px] px-5 py-3"
      >
        {options.map((opt) => (
          <li
            key={opt}
            className="py-2 cursor-pointer hover:font-medium"
            onClick={() => onSelect(opt)}
          >
            {opt}
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
