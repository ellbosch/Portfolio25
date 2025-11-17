import Header from '../components/Header';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import VideoPlayer from '../components/VideoPlayer';
import DeviceFrame from '../components/DeviceFrame';
import IPhoneFrame from '../components/iPhoneFrame';
import ScrollRotatingFrame from '../components/ScrollRotatingFrame';
import ScrollFade from '../components/ScrollFade';
import stitchIcon from '../assets/stitch-icon.png';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Projects Demo Section */}
        <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="mt-12">
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
          </div>
        </section>

        {/* Vellum Section */}
        <section id="vellum" className="bg-gray-50 dark:bg-gray-800 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <ScrollFade delay={200}>
                <h2 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">Vellum</h2>
              </ScrollFade>
              <ScrollFade delay={400}>
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  A video generation app that transforms your creative ideas into stunning visual content.
                </p>
              </ScrollFade>
            </div>

            {/* First Video - Discover & Inspire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <ScrollFade delay={200}>
                  <IPhoneFrame>
                    <VideoPlayer
                      videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-feed-downscaled.mov"
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </IPhoneFrame>
                </ScrollFade>
              </div>
              <div className="order-1 md:order-2">
                <ScrollFade delay={400}>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Discover & Inspire
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    Browse an endless feed of AI-generated videos. Swipe through stunning visuals created by our community and find inspiration for your next creation.
                  </p>
                </ScrollFade>
              </div>
            </div>

            {/* Second Video - Create & Customize */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <ScrollFade delay={400}>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Create & Customize
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    Transform your ideas into reality with our intuitive editing tools. Adjust parameters, tweak styles, and perfect your vision with real-time AI generation.
                  </p>
                </ScrollFade>
              </div>
              <div>
                <ScrollFade delay={200}>
                  <IPhoneFrame>
                    <VideoPlayer
                      videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-edit-downscaled.mov"
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </IPhoneFrame>
                </ScrollFade>
              </div>
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
