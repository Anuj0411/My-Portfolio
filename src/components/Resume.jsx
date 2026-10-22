import { Resume } from '../assets/index';

const MyResume = () => {
  return (
    <a
      href={Resume}
      download="Anuj_Parashar_Resume.pdf"
      className="border border-white/20 px-3 py-1.5 text-[12px] tracking-[0.16em] uppercase text-white/80 hover:border-white/50 hover:text-white transition-colors"
    >
      Resume
      <span className="sr-only"> (PDF)</span>
    </a>
  );
};

export default MyResume;
