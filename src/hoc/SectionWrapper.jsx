import { motion } from 'framer-motion';

import { styles } from '../style';
import { staggerContainer } from '../utils/motion';

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        id={idName || undefined}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
