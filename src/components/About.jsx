import { motion } from 'framer-motion';

import { styles } from '../style';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import PortraitDust from './PortraitDust';

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionSubText}>About</h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-center">
        <motion.div variants={fadeIn('right', 'tween', 0.1, 0.8)} className="relative">
          <PortraitDust />
        </motion.div>

        <motion.div variants={fadeIn('', '', 0.15, 0.8)}>
          <p className="text-white/65 text-[16px] sm:text-[17px] max-w-xl leading-[1.8]">
            Senior Frontend Engineer with 8+ years of experience building scalable, high-performance
            web applications using React and Angular. Strong expertise in frontend architecture,
            performance optimization, and reusable component design for enterprise platforms.
            Experienced in leveraging AI-assisted development tools and automation workflows to
            improve productivity and accelerate delivery.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
