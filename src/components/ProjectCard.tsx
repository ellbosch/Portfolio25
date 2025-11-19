import VideoPlayer from './VideoPlayer';

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  videoUrl: string;
  links: ProjectLink[];
}

const ProjectCard = ({ title, description, videoUrl, links }: ProjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {videoUrl && (
        <div className="aspect-video">
          <VideoPlayer videoUrl={videoUrl} />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex gap-3 flex-wrap">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
