import Header from '../components/Header';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import VideoPlayer from '../components/VideoPlayer';
import DeviceFrame from '../components/DeviceFrame';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Projects Demo Section */}
        <section id="about" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mt-12">
              <DeviceFrame>
                <VideoPlayer
                  videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch-demo.mp4"
                  autoplay={true}
                  loop={true}
                  muted={true}
                />
              </DeviceFrame>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <VideoPlayer
                videoUrl="https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch_ai_rects.mp4"
                autoplay={true}
                loop={true}
                muted={true}
              />
            </div>
          </div>
        </section>

        {/* iOS Projects Section */}
        <section id="ios-projects" className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">iOS Projects</h2>
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
        <section id="ai-projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">AI Projects</h2>
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
        <section id="microsoft" className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Microsoft Experience</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-lg text-gray-700">
                {/* Add your Microsoft experience highlights here */}
                Brief highlights of your work at Microsoft...
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="https://github.com/ellbosch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
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
