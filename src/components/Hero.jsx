import { motion } from 'framer-motion';

import { styles } from '../style';
import { Resume } from '../assets';
import SocialLinks from './SocialLinks';

const proof = ['8+ years', 'React & Angular', 'DNS analytics', '30+ Angular MFEs', 'Pune'];

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto">
      <div className={`max-w-7xl mx-auto ${styles.paddingX} pt-32 sm:pt-36 pb-28`}>
        <motion.p
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-[12px] sm:text-[13px] uppercase tracking-[0.32em] text-white/55"
        >
          Senior Frontend Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0.6, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`${styles.heroHeadText} mt-4 [text-shadow:0_0_28px_rgba(5,8,22,0.95)]`}
        >
          Anuj Parashar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0.4, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          className={`${styles.heroSubText} mt-6`}
        >
          I build React and Angular systems that hold under load — analytics platforms,
          micro-frontends, and AI-assisted delivery.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:text-[14px] text-white/60"
        >
          {proof.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              {index > 0 && <span className="h-px w-3 bg-white/20" aria-hidden="true" />}
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={Resume}
            download="Anuj_Parashar_Resume.pdf"
            className="border border-white/25 px-5 py-2.5 text-[13px] tracking-[0.16em] uppercase text-white/90 hover:border-white/60 hover:text-white transition-colors"
          >
            Download resume
            <span className="sr-only"> (PDF)</span>
          </a>
          <a
            href="#contact"
            className="px-2 py-2.5 text-[13px] tracking-[0.16em] uppercase text-white/70 hover:text-white transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-8"
        >
          <SocialLinks />
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center">
        <a
          href="#impact"
          className="text-[11px] tracking-[0.28em] uppercase text-white/55 hover:text-white/80"
        >
          <span aria-hidden="true">Scroll</span>
          <span className="sr-only">Selected impact</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
