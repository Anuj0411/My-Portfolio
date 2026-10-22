import { motion } from 'framer-motion';

import { styles } from '../style';
import { craft } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Craft = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionSubText}>Craft</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
        {craft.map((group, index) => (
          <motion.article
            key={group.title}
            variants={fadeIn('up', 'tween', 0.08 * index, 0.7)}
            className={`lg:px-8 ${index === 0 ? 'lg:pl-0' : ''} ${
              index < craft.length - 1 ? 'lg:border-r lg:border-white/10' : 'lg:pr-0'
            }`}
          >
            <h3 className="font-serif text-white text-[26px] sm:text-[28px] tracking-tight">
              {group.title}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-[15px] text-white/60 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Craft, 'craft');
