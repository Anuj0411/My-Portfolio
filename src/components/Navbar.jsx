import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../style';
import { navLinks, contactInfo } from '../constants';
import { logo, menu, close, github, linkedin } from '../assets';
import { MyResume } from './index';
const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="test-white text-[18px] font-bold cursor-pointer flex items-center gap-2">
            Anuj Parashar
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`${
                  active === link.title ? 'text-white' : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            );
          })}
          <MyResume />
          {/* Social Icons */}
          <li className="flex gap-3 ml-2">
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-tertiary flex justify-center items-center hover:scale-110 transition-transform"
              title="LinkedIn"
            >
              <img src={linkedin} alt="LinkedIn" className="w-5 h-5 object-contain" />
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-tertiary flex justify-center items-center hover:scale-110 transition-transform"
              title="GitHub"
            >
              <img src={github} alt="GitHub" className="w-5 h-5 object-contain" />
            </a>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex sm:flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? 'text-white' : 'text-secondary'
                    }font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(link.title);
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
