import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import VideoPlayer from '../components/VideoPlayer';
import DeviceFrame from '../components/DeviceFrame';
import IPhoneFrame from '../components/iPhoneFrame';
import ScrollRotatingFrame from '../components/ScrollRotatingFrame';
import ScrollFade from '../components/ScrollFade';
import PaddingParallax from '../components/PaddingParallax';
import FeatureTabs from '../components/FeatureTabs';
import Modal from '../components/Modal';
import ExperienceButton from '../components/ExperienceButton';
import TerminalFrame from '../components/TerminalFrame';
import { useMediaQuery } from '../hooks/useMediaQuery';
import stitchIcon from '../assets/stitch-icon.png';
import vellumIcon from '../assets/vellum-icon.png';
import lobeIcon from '../assets/lobe-icon.png';
import lobeHeader from '../assets/lobe-header.jpg';
import lobeDesktop from '../assets/lobe-desktop.jpg';
import lobeTrain from '../assets/lobe-train.mp4';
import mssqlCliGif from '../assets/mssql-cli-autocomplete.gif';
import resumePDF from '../assets/resume.pdf';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfGlobe, sfBrandGithub, sfWandAndSparkles, sfSliderHorizontal3, sfBrandLinkedin, sfEnvelope, sfTextDocument } from '@bradleyhodges/sfsymbols';

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Modal state management
  const [isStitchModalOpen, setIsStitchModalOpen] = useState(false);
  const [isLobeModalOpen, setIsLobeModalOpen] = useState(false);
  const [isMssqlCliModalOpen, setIsMssqlCliModalOpen] = useState(false);

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
        <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 overflow-x-hidden">
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
              <ScrollFade delay={300}>
                <div className="flex justify-center">
                  <ExperienceButton onClick={() => setIsStitchModalOpen(true)}>
                    Co-Founder, Lead Engineering Architect
                  </ExperienceButton>
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
                    description: "Rapid AR prototyping in minutes instead of hours.",
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
                    description: "120 FPS regardless of graph complexity, simulating full-scale app performance.",
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
                      videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-feed-2.mp4"
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </IPhoneFrame>
                </PaddingParallax>

                {isMobile ? (
                  <div className="w-full text-center md:mt-8">
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
                ) : (
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
                )}
              </div>

              {/* Right column */}
              <div className="flex flex-col md:gap-12 mt-0 md:mt-60">
                {!isMobile && (
                  <div className="w-full text-center md:mb-60">
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
                )}

                <PaddingParallax disabled={isMobile}>
                  <IPhoneFrame>
                    <VideoPlayer
                      videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-edit-downscaled.mov"
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </IPhoneFrame>
                </PaddingParallax>

                {isMobile && (
                  <div className="w-full text-center mt-4">
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
                )}
              </div>
            </div>

            {/* Beta Testing Notice */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl px-2 py-5 md:px-8 md:py-6">
                <p className="text-l md:text-2xl text-gray-700 dark:text-gray-200 font-bold">
                  Vellum is currently in private beta testing.</p>
                <p className="text-l md:text-2xl text-gray-700 dark:text-gray-200 font-bold underline">
                  <a
                    href="#"
                    onClick={handleEmailClick}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Reach out to Elliot for TestFlight access.
                  </a>
                </p>
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
              <ScrollFade delay={300}>
                <div className="flex justify-center">
                  <ExperienceButton onClick={() => setIsLobeModalOpen(true)}>
                    Software Engineer 2
                  </ExperienceButton>
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

        {/* mssql-cli Section */}
        <section id="mssql-cli" className="bg-white dark:bg-gray-900 py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <ScrollFade delay={200}>
                <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 font-mono">
                  mssql-cli
                </h2>
              </ScrollFade>
              <ScrollFade delay={300}>
                <div className="flex justify-center">
                  <ExperienceButton onClick={() => setIsMssqlCliModalOpen(true)}>
                    Software Engineer
                  </ExperienceButton>
                </div>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  A cross-platform command-line interface for SQL Server with IntelliSense, syntax highlighting, and multi-line editing.
                </p>
              </ScrollFade>
              <ScrollFade delay={500}>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <a
                    href="https://github.com/dbcli/mssql-cli"
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

            {/* Terminal Demo */}
            <div className="max-w-4xl mx-auto">
              <ScrollFade delay={200}>
                <TerminalFrame>
                  <img
                    src={mssqlCliGif}
                    alt="mssql-cli autocomplete demo"
                    className="w-full h-auto"
                  />
                </TerminalFrame>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-800">
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
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium w-full md:w-auto"
              >
                <SFIcon icon={sfTextDocument} size={20} />
                Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Stitch Modal */}
      <Modal
        isOpen={isStitchModalOpen}
        onClose={() => setIsStitchModalOpen(false)}
        title="Stitch: Co-Founder, Lead Engineering Architect"
      >
        <div className="space-y-6 text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Platform Architecture
            </h3>
            <ul className="list-disc list-outside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Architected in native Swift the visual programming language (VPL) powering Stitch, supporting hundreds of modular nodes. Managed a 3 person dev team.
              </li>
              <li>
                Built a unified front-end media pipeline for audio, video, microphone, camera, image, and AR in a single extensible framework, delivering real-time performance with strong memory and thread safety.
              </li>
              <li>
                Designed a document migration system that preserved user data over dozens of major schema changes.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Real-Time Graph Engines
            </h3>
            <ul className="list-disc list-outside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Designed and implemented the first AR and 3D prototyping system in a design tool, enabling users to simulate and manipulate environments in seconds instead of hours.
              </li>
              <li>
                Developed graph evaluation algorithms and optimized node-queuing system supporting cyclic and infinite loops while maintaining 120 FPS, critical for real-time simulation and media workflows.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              AI & Product Leadership
            </h3>
            <ul className="list-disc list-outside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Led the company's shift to an AI-first product, owning a 3-month roadmap that shipped the first LLM integrated directly into a VPL environment, dramatically increasing designers' prototyping speed.
              </li>
              <li>
                Drove customer outreach and community programs; turned user feedback into roadmap priorities that became our AI pivot.
              </li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Lobe Modal */}
      <Modal
        isOpen={isLobeModalOpen}
        onClose={() => setIsLobeModalOpen(false)}
        title="Lobe: Software Engineer 2"
      >
        <div className="space-y-6 text-left">
          <ul className="list-disc list-outside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Developed front-end experiences for Lobe, a no-code machine learning app. Contributed to Lobe's Electron app, iOS app, and website for public preview release. Tech stack included TypeScript, Node.js, React, Redux, Python, HTML, and CSS.
            </li>
            <li>
              Developed iOS app to help Lobe's customers quickly adopt product into Swift codebases. Created additional example code in Python, Swift, and TypeScript for developers to easily leverage Lobe's API.
            </li>
            <li>
              Led team effort to improve code reliability. Built automated code coverage reporting and bug categorization to help engineers identify vulnerabilities before merging code.
            </li>
          </ul>
        </div>
      </Modal>

      {/* mssql-cli Modal */}
      <Modal
        isOpen={isMssqlCliModalOpen}
        onClose={() => setIsMssqlCliModalOpen(false)}
        title="mssql-cli: Software Engineer"
      >
        <div className="space-y-6 text-left">
          Led development work for the GA launch of mssql-cli, an interactive command-line utility for SQL Server built in Python. Managed distributions across macOS, Linux, and Windows by introducing automation using Docker. Improved pipeline pass rate from 50% to 97% while increasing code coverage by 4%.
        </div>
      </Modal>
    </div>
  );
};

export default Home;
