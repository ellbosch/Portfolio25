import Header from '../components/Header';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import VideoPlayer from '../components/VideoPlayer';
import DeviceFrame from '../components/DeviceFrame';
import IPhoneFrame from '../components/iPhoneFrame';
import ScrollRotatingFrame from '../components/ScrollRotatingFrame';
import ScrollFade from '../components/ScrollFade';
import PaddingParallax from '../components/PaddingParallax';
import FeatureTabs from '../components/FeatureTabs';
import { useMediaQuery } from '../hooks/useMediaQuery';
import stitchIcon from '../assets/stitch-icon.png';
import vellumIcon from '../assets/vellum-icon.png';
import lobeIcon from '../assets/lobe-icon.png';
import lobeHeader from '../assets/lobe-header.jpg';
import lobeDesktop from '../assets/lobe-desktop.jpg';

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Projects Demo Section */}
        <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mt-12 text-center">
              <ScrollRotatingFrame>
                <DeviceFrame>
                  <VideoPlayer
                    videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch-demo.mp4"
                    autoplay={true}
                    loop={true}
                    muted={true}
                  />
                </DeviceFrame>
              </ScrollRotatingFrame>
            </div>
            <div className="mt-8 max-w-3xl mx-auto">
              <ScrollFade delay={200}>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <img
                    src={stitchIcon}
                    alt="Stitch Icon"
                    className="w-32 h-32 rounded-[22%] shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <h2 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">Stitch</h2>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed text-center">
                  Meet Stitch, an AI-powered design prototyping, unapologetically made for designers, harnessing the first-ever visual programming language powered by an LLM.
                </p>
              </ScrollFade>
            </div>
            <div className="mt-36 max-w-3xl mx-auto">
              <ScrollFade delay={600}>
                <div className="rounded-[20px] overflow-hidden">
                  <VideoPlayer
                    videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch_ai_rects.mp4"
                    autoplay={true}
                    loop={true}
                    muted={true}
                  />
                </div>
              </ScrollFade>
              <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed text-center mt-12 mb-8">
                Today's AI tools are inadequate for interaction designers. Unlike other vibe coding tools which only expose code, Stitch leverages vibe coding and a familiar node-based visual programming language.
              </p>
            </div>

            {/* Feature Tabs */}
            <div className="mt-32">
              <FeatureTabs
                tabs={[
                  {
                    title: "AR",
                    description: "Stitch enables rapid AR prototyping, supporting complex 3D object manipulation built in minutes instead of hours.",
                    videoUrl: "https://portfolio25-videos.s3.us-west-1.amazonaws.com/AR.mp4",
                    symbol: "arkit",
                  },
                  {
                    title: "Object Detection",
                    description: "Prototype sophisticated object-detection scenarios — all with no code.",
                    videoUrl: "https://portfolio25-videos.s3.us-west-1.amazonaws.com/object-detection.mp4",
                    symbol: "viewfinder",
                  },
                  {
                    title: "Powerful Rendering Engine",
                    description: "Stitch maintains 120 FPS regardless of graph complexity, simulating the performance of a full-scale app.",
                    videoUrl: "https://portfolio25-videos.s3.us-west-1.amazonaws.com/humane.mp4",
                    symbol: "tachometer",
                  },
                  {
                    title: "Zero-Tradeoff Prototyping",
                    description: "Stitch empowered Airbnb's design team to prototype behavior-rich UI, including haptic interactions.",
                    videoUrl: "https://portfolio25-videos.s3.us-west-1.amazonaws.com/monthly-stays.mp4",
                    symbol: "slider.horizontal.3",
                  },
                  {
                    title: "Image Classification",
                    description: "Machine-learning prototyping is always at your fingertips.",
                    videoUrl: "https://portfolio25-videos.s3.us-west-1.amazonaws.com/redwoods.mp4",
                    symbol: "photo.badge.checkmark",
                  },
                  {
                    title: "3D",
                    description: "Stitch's VPL natively supports 3D — a long-requested feature in the design community.",
                    videoUrl: "https://portfolio25-videos.s3.us-west-1.amazonaws.com/earth.mp4",
                    symbol: "cube.fill",
                  },
                ]}
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* Vellum Section */}
        <section id="vellum" className="bg-gray-50 dark:bg-gray-800 pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <ScrollFade delay={200}>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <img
                    src={vellumIcon}
                    alt="Vellum Icon"
                    className="w-32 h-32 rounded-[22%] shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <h2 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">Vellum</h2>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  A video generation app that transforms your creative ideas into stunning visual content.
                </p>
              </ScrollFade>
            </div>

            {/* Two column layout with vertical content flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
              {/* Left column */}
              <div className="flex flex-col md:mb-100 md:gap-12">
                <PaddingParallax reverse={true} disabled={isMobile}>
                  <IPhoneFrame>
                    <VideoPlayer
                      videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-feed-downscaled.mov"
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </IPhoneFrame>
                </PaddingParallax>

                <div className="w-full text-center md:mt-20">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Create & Customize
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    Transform your ideas into reality with our intuitive editing tools. Adjust parameters, tweak styles, and perfect your vision with real-time AI generation.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-12 mt-0 md:mt-60">
                <div className="w-full text-center md:mb-60 order-2 md:order-1">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Discover & Inspire
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    Browse an endless feed of AI-generated videos. Swipe through stunning visuals created by our community and find inspiration for your next creation.
                  </p>
                </div>

                <PaddingParallax disabled={isMobile} className="order-1 md:order-2">
                  <IPhoneFrame>
                    <VideoPlayer
                      videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-edit-downscaled.mov"
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </IPhoneFrame>
                </PaddingParallax>
              </div>
            </div>
          </div>
        </section>

        {/* Lobe Section */}
        <section id="lobe" className="bg-white dark:bg-gray-900 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <ScrollFade delay={200}>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <img
                    src={lobeIcon}
                    alt="Lobe Icon"
                    className="w-32 h-32 rounded-[22%] shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <h2 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">Lobe</h2>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  Machine learning made easy. Train custom models without writing code.
                </p>
              </ScrollFade>
            </div>

            {/* Lobe Header Image */}
            <div className="mb-20">
              <ScrollFade delay={200}>
                <div className="rounded-[20px] overflow-hidden shadow-2xl">
                  <img
                    src={lobeHeader}
                    alt="Lobe Header"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed text-center mt-12">
                  Lobe is a free, easy-to-use desktop application that empowers anyone to train custom machine learning models without writing a single line of code.
                </p>
              </ScrollFade>
            </div>

            {/* Lobe Desktop Image */}
            <div className="mb-20">
              <ScrollFade delay={200}>
                <div className="rounded-[20px] overflow-hidden shadow-2xl">
                  <img
                    src={lobeDesktop}
                    alt="Lobe Desktop"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed text-center mt-12">
                  With an intuitive interface and powerful automation, Lobe makes it simple to collect examples, train your model, and export it for use in your app.
                </p>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* iOS Projects Section */}
        <section id="ios-projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">iOS Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Placeholder - will be populated with actual projects */}
              <ProjectCard
                title="Project Title"
                description="Brief description of the iOS project"
                videoUrl=""
                links={[
                  { label: "GitHub", url: "#" },
                  { label: "App Store", url: "#" }
                ]}
              />
            </div>
          </div>
        </section>

        {/* AI Projects Section */}
        <section id="ai-projects" className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">AI Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Placeholder - will be populated with actual projects */}
              <ProjectCard
                title="AI Project Title"
                description="Brief description of the AI project"
                videoUrl=""
                links={[
                  { label: "GitHub", url: "#" },
                  { label: "Demo", url: "#" }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Microsoft Experience Section */}
        <section id="microsoft" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Microsoft Experience</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-lg text-gray-700 dark:text-gray-200">
                {/* Add your Microsoft experience highlights here */}
                Brief highlights of your work at Microsoft...
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Get In Touch</h2>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="https://github.com/ellbosch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/elliotboschwitz/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:your.email@example.com"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
