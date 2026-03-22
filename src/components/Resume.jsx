import { Resume } from '../assets/index';

const MyResume = () => {
  return (
    <a
      href={Resume}
      download="Anuj_Parashar_Resume.pdf"
      className="flex items-center gap-2 bg-tertiary px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-300 group"
    >
      <svg
        className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className="text-white font-medium">Download Resume</span>
    </a>
  );
};

export default MyResume;
