const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/55 text-sm text-center md:text-left">
            © {currentYear} Anuj Parashar
          </p>
          <nav aria-label="Footer">
            <ul className="flex gap-6 text-[12px] tracking-[0.16em] uppercase">
              <li>
                <a href="#about" className="text-white/60 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#work" className="text-white/60 hover:text-white transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/60 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
