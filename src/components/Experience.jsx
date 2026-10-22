import { motion } from 'framer-motion';

import { styles } from '../style';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionSubText}>Work</h2>
      </motion.div>

      <div className="mt-12">
        {experiences.map((role, index) => (
          <motion.article
            key={`${role.company_name}-${role.date}`}
            variants={fadeIn('up', 'tween', 0.08 * index, 0.7)}
            className={`grid grid-cols-1 md:grid-cols-[minmax(12.5rem,0.34fr)_minmax(0,1fr)] gap-3 md:gap-10 py-10 ${
              index === 0 ? 'pt-0' : 'border-t border-white/10'
            }`}
          >
            <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-white/55 md:pt-2">
              {role.date.replace(' - ', ' — ')}
            </p>
            <div>
              <h3 className="font-serif text-white text-[26px] sm:text-[30px] tracking-tight leading-tight">
                {role.title}
              </h3>
              <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-white/60">
                {role.company_name}
              </p>
              {role.product && (
                <p className="mt-3 text-[15px] text-white/60 leading-relaxed">{role.product}</p>
              )}
              <ul className="mt-6 space-y-3">
                {role.points.map((point) => (
                  <li key={point} className="text-[15px] text-white/65 leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
