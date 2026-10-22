import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../style';
import { navLinks, contactInfo } from '../constants';
import { headerAvatar, menu, close, github, linkedin } from '../assets';
import MyResume from './Resume';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const menuButtonRef = useRef(null);
  const menuId = 'primary-mobile-menu';

  useEffect(() => {
    if (!toggle) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setToggle(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  return (
    <nav
      aria-label="Primary"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary/35 backdrop-blur-md border-b border-white/5`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          aria-label="Anuj Parashar — Home"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
            <img src={headerAvatar} alt="" className="h-full w-full object-cover" />
          </span>
          <p className="text-white/90 text-[15px] font-medium tracking-wide">Anuj Parashar</p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`${
                  active === link.title ? 'text-white' : 'text-white/70'
                } hover:text-white text-[13px] tracking-[0.16em] uppercase`}
              >
                <a href={`#${link.id}`} onClick={() => setActive(link.title)}>
                  {link.title}
                </a>
              </li>
            );
          })}
          <li>
            <MyResume />
          </li>
          <li className="flex gap-3 ml-2">
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/15 flex justify-center items-center hover:border-white/40 transition-colors"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <img src={linkedin} alt="" className="w-5 h-5 object-contain" />
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/15 flex justify-center items-center hover:border-white/40 transition-colors"
              aria-label="GitHub (opens in a new tab)"
            >
              <img src={github} alt="" className="w-5 h-5 object-contain" />
            </a>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            aria-expanded={toggle}
            aria-controls={menuId}
            className="p-2 -mr-2"
            onClick={() => setToggle((open) => !open)}
          >
            <img src={toggle ? close : menu} alt="" className="w-[22px] h-[22px] object-contain" />
          </button>
          <div
            id={menuId}
            hidden={!toggle}
            className={`${
              !toggle ? 'hidden' : 'flex'
            } absolute top-[4.5rem] right-4 min-w-[11rem] z-10 border border-white/10 bg-primary/95 backdrop-blur-md p-5`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 w-full">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? 'text-white' : 'text-white/70'
                    } text-[13px] tracking-[0.16em] uppercase`}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
              <li onClick={() => setToggle(false)}>
                <MyResume />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
