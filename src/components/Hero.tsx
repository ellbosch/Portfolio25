import meImage from '../assets/me.png';

const Hero = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-12 text-gray-900 text-center">
          Elliot Boschwitz
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-12 mb-8">
          <img
            src={meImage}
            alt="Profile"
            className="w-64 h-64 rounded-full object-cover shadow-lg"
          />
          <div className="flex-1">
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed">
              I'm an iOS and AI engineer passionate about building innovative mobile experiences
              and intelligent solutions. With a background at Microsoft and expertise in modern
              development practices, I create applications that combine cutting-edge technology
              with user-centered design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
