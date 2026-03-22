const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-8 border-t border-secondary/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary text-sm text-center md:text-left">
            © {currentYear} Anuj Parashar. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="text-secondary hover:text-white transition-colors">
              About
            </a>
            <a href="#work" className="text-secondary hover:text-white transition-colors">
              Experience
            </a>
            <a href="#contact" className="text-secondary hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-secondary text-xs">Built with React, Three.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
