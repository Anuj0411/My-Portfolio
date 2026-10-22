import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const tone = type === 'success' ? 'border-white/20' : 'border-red-400/40';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role={type === 'error' ? 'alert' : 'status'}
          aria-live={type === 'error' ? 'assertive' : 'polite'}
          aria-atomic="true"
          initial={{ opacity: 0, y: -16, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -16, x: '-50%' }}
          className={`fixed top-24 left-1/2 z-[9999] flex items-center gap-3 bg-primary/95 backdrop-blur-md border ${tone} text-white px-5 py-3 min-w-[280px] max-w-[min(500px,calc(100vw-2rem))]`}
        >
          <p className="text-[14px] text-white/85">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-white/50 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
