import { motion } from 'framer-motion';

import { styles } from '../style';
import { impacts } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Impact = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionSubText}>Selected impact</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
        {impacts.map((item, index) => (
          <motion.article
            key={item.label}
            variants={fadeIn('up', 'tween', 0.1 * index, 0.7)}
            className={`md:px-8 ${index === 0 ? 'md:pl-0' : ''} ${
              index < impacts.length - 1 ? 'md:border-r md:border-white/10' : 'md:pr-0'
            }`}
          >
            <h3 className="font-serif text-white text-[40px] sm:text-[44px] tracking-tight leading-none">
              {item.metric}
            </h3>
            <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-white/60">
              {item.label}
            </p>
            <p className="mt-4 text-[15px] text-white/65 leading-relaxed">{item.detail}</p>
            <p className="mt-5 text-[12px] uppercase tracking-[0.2em] text-white/35">
              {item.context}
            </p>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Impact, 'impact');
