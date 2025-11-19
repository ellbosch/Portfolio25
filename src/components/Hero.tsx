import meImage from '../assets/me.png';
import stitchIcon from '../assets/stitch-icon.png';
import msftIcon from '../assets/msft-icon.png';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfBriefcaseFill } from '@bradleyhodges/sfsymbols';

const Hero = () => {
  // Calculate years of work experience from August 1, 2015
  const startDate = new Date('2015-08-01');
  const today = new Date();
  const yearsDiff = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const yearsOfExperience = Math.ceil(yearsDiff);

  const highlights = [
    {
      icon: <img src={stitchIcon} alt="Stitch" className="w-6 h-6 grayscale rounded-lg" />,
      text: 'Lead iOS Engineering Architect at Stitch',
      delay: '1000ms'
    },
    {
      icon: <img src={msftIcon} alt="Microsoft" className="w-6 h-6 grayscale" />,
      text: 'Software Engineer & Program Manager at Microsoft',
      delay: '1200ms'
    },
    {
      icon: <SFIcon icon={sfBriefcaseFill} size={24} className="text-gray-500 dark:text-gray-400" />,
      text: `${yearsOfExperience} Years of Software Engineering & Program Management Experience`,
      delay: '1300ms'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      ),
      text: 'University of Pennsylvania, Majoring in Computer Science & Cognitive Science',
      delay: '1400ms'
    }
  ];

  return (
    <section className="min-h-[65vh] pt-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1
          className="text-5xl md:text-7xl font-bold mb-12 text-gray-900 dark:text-white text-center animate-fade-in"
          style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0ms'
          }}
        >
          Hi 👋, I'm Elliot
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <img
            src={meImage}
            alt="Profile"
            className="w-64 h-64 rounded-full object-cover shadow-lg"
          />
          <div className="flex-1 space-y-4">
            <h2
              className="text-xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6 animate-fade-in"
              style={{
                animationDelay: '800ms',
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              iOS and AI Experiences Engineer
            </h2>
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 animate-fade-in"
                style={{
                  animationDelay: item.delay,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400">
                  {item.icon}
                </div>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
