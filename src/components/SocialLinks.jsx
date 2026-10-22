import { github, linkedin, email, phone } from '../assets';
import { contactInfo } from '../constants';

const SocialLinks = ({ className = '' }) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: linkedin,
      url: contactInfo.linkedin,
    },
    {
      name: 'GitHub',
      icon: github,
      url: contactInfo.github,
    },
    {
      name: 'Email',
      icon: email,
      url: `mailto:${contactInfo.email}`,
    },
    {
      name: 'Phone',
      icon: phone,
      url: `tel:${contactInfo.phone}`,
    },
  ];

  return (
    <ul className={`flex gap-3 ${className}`} aria-label="Contact links">
      {socialLinks.map((link) => {
        const external = link.name !== 'Phone' && link.name !== 'Email';
        return (
          <li key={link.name}>
            <a
              href={link.url}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="w-9 h-9 rounded-full border border-white/15 flex justify-center items-center hover:border-white/40 transition-colors"
              aria-label={external ? `${link.name} (opens in a new tab)` : link.name}
            >
              <img src={link.icon} alt="" className="w-4 h-4 object-contain opacity-80" />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
