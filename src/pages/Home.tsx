import React from 'react';
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
import lobeTrain from '../assets/lobe-train.mp4';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfGlobe, sfBrandGithub, sfWandAndSparkles, sfSliderHorizontal3, sfBrandLinkedin, sfEnvelope, sfPersonTextRectangleFill } from '@bradleyhodges/sfsymbols';

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Email obfuscation - split into parts to avoid scraping
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const user = 'elliot.boschwitz';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Projects Demo Section */}
        <section id="about" className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-800 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mt-6 md:mt-12 text-center">
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
            <div className="mt-6 md:mt-8 max-w-3xl mx-auto">
              <ScrollFade delay={200}>
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
                  <img
                    src={stitchIcon}
                    alt="Stitch Icon"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-[22%] shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">Stitch</h2>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed text-center">
                  Meet Stitch, an AI-powered design prototyping, unapologetically made for designers, harnessing the first-ever visual programming language powered by an LLM.
                </p>
              </ScrollFade>
              <ScrollFade delay={500}>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <a
                    href="https://stitchdesign.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
                  >
                    <SFIcon icon={sfGlobe} size={20} />
                    Website
                  </a>
                  <a
                    href="https://github.com/stitchDesign/Stitch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
                  >
                    <SFIcon icon={sfBrandGithub} size={20} />
                    GitHub
                  </a>
                </div>
              </ScrollFade>
            </div>
            <div className="mt-16 md:mt-36 mx-auto">
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
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed text-center mt-4 mb-8 max-w-3xl mx-auto">
                While most vibe-coding solutions focus solely on code, Stitch combines vibe coding with a familiar, node-based visual programming language. Making advanced interactions fast, intuitive, and accessible.
              </p>
            </div>

            {/* Feature Tabs */}
            <div className="mt-16 md:mt-32">
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
                    description: "Prototype sophisticated object-detection scenarios, all with no code.",
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
                    description: "Stitch's VPL natively supports 3D, a long-requested feature in the design community.",
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
        <section id="vellum" className="bg-white dark:bg-gray-900 pt-12 md:pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <ScrollFade delay={200}>
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
                  <img
                    src={vellumIcon}
                    alt="Vellum Icon"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-[22%] shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">Vellum</h2>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  AI-powered storytelling for short-form TV series.
                </p>
              </ScrollFade>
            </div>

            {/* Two column layout with vertical content flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 md:pb-20">
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
                  <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 gap-3">
                    <SFIcon
                      icon={sfSliderHorizontal3}
                      size={48}
                      className="text-gray-900 dark:text-white mb-2"
                    />
                    &nbsp;Robust Editing Tools
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    Use the assistant to refine any element of your screenplay, from character descriptions and environments to camera angles and shot composition.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-12 mt-0 md:mt-60">
                <div className="w-full text-center md:mb-60 order-2 md:order-1">
                  <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 gap-3">
                    <SFIcon
                      icon={sfWandAndSparkles}
                      size={48}
                      className="text-gray-900 dark:text-white mb-3"
                    />
                    &nbsp;AI-Powered Screenwriting
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    Director-level power in the palm of your hand. Start with a short prompt and generate a multi-shot, cinematic-style video with no time constraints.
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
        <section id="lobe" className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <ScrollFade delay={200}>
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
                  <img
                    src={lobeIcon}
                    alt="Lobe Icon"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-[22%] shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">Lobe</h2>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  Lobe is a free, easy-to-use desktop application that empowers anyone to train custom machine learning models without writing a single line of code.
                </p>
              </ScrollFade>
            </div>

            {/* Lobe Images */}
            <div>
              <ScrollFade delay={200}>
                <div className="overflow-hidden shadow-2xl rounded-[20px]">
                  <img
                    src={lobeHeader}
                    alt="Lobe Header"
                    className="w-full h-auto"
                  />
                  <div className="border-t-2 border-gray-200 dark:border-gray-700"></div>
                  <div className="-mx-4 md:mx-0">
                    <VideoPlayer
                      videoUrl={lobeTrain}
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </div>
                  <div className="border-t-2 border-gray-200 dark:border-gray-700"></div>
                                    <img
                    src={lobeDesktop}
                    alt="Lobe Desktop"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Get In Touch</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-[200px] md:max-w-none mx-auto">
              <a
                href="https://www.linkedin.com/in/elliotboschwitz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium w-full md:w-auto"
              >
                <SFIcon icon={sfBrandLinkedin} size={20} />
                LinkedIn
              </a>
              <a
                href="https://github.com/ellbosch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium w-full md:w-auto"
              >
                <SFIcon icon={sfBrandGithub} size={20} />
                GitHub
              </a>
              <a
                href="#"
                onClick={handleEmailClick}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium w-full md:w-auto"
              >
                <SFIcon icon={sfEnvelope} size={20} />
                Email
              </a>
              <a
                href="/resume"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium w-full md:w-auto"
              >
                <SFIcon icon={sfPersonTextRectangleFill} size={20} />
                Resume
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
