import { motion } from 'framer-motion';

import { styles } from '../style';
import { projects } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionSubText}>Projects</h2>
      </motion.div>

      <div className="mt-12">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            variants={fadeIn('up', 'tween', 0.08 * index, 0.7)}
            className={`grid grid-cols-1 md:grid-cols-[minmax(12.5rem,0.34fr)_minmax(0,1fr)] gap-3 md:gap-10 py-10 ${
              index === 0 ? 'pt-0' : 'border-t border-white/10'
            }`}
          >
            <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-white/55 md:pt-2">
              {project.role}
            </p>
            <div>
              <h3 className="font-serif text-white text-[26px] sm:text-[30px] tracking-tight leading-tight">
                {project.name}
              </h3>
              <p className="mt-3 text-[15px] text-white/65 leading-relaxed max-w-2xl">
                {project.summary}
              </p>
              <ul className="mt-6 space-y-3">
                {project.points.map((point) => (
                  <li key={point} className="text-[15px] text-white/65 leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] tracking-[0.16em] uppercase text-white/80 hover:text-white transition-colors border-b border-white/25 hover:border-white/60 pb-1"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, 'projects');
