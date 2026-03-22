import { github, linkedin, email, phone } from '../assets';
import { contactInfo } from '../constants';

const SocialLinks = ({ className = '' }) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: linkedin,
      url: contactInfo.linkedin,
      color: '#0077B5',
    },
    {
      name: 'GitHub',
      icon: github,
      url: contactInfo.github,
      color: '#333',
    },
    {
      name: 'Email',
      icon: email,
      url: `mailto:${contactInfo.email}`,
      color: '#EA4335',
    },
    {
      name: 'Phone',
      icon: phone,
      url: `tel:${contactInfo.phone}`,
      color: '#25D366',
    },
  ];

  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.name !== 'Phone' && link.name !== 'Email' ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-tertiary flex justify-center items-center hover:scale-110 transition-transform"
          title={link.name}
        >
          <img src={link.icon} alt={link.name} className="w-6 h-6 object-contain" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
