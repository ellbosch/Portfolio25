# Elliot Boschwitz Portfolio

A modern, minimal portfolio website showcasing iOS and AI projects, built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **React Router v6** - Client-side routing with hash-based navigation
- **Video.js** - Video player for project demos

## Features

- Responsive, mobile-first design
- Clean, minimal aesthetic
- Video showcases for iOS and AI projects
- Hash-based routing for SPA compatibility with AWS Lambda
- Optimized production builds with code splitting
- Smooth scroll navigation

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Portfolio25/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Hero.tsx      # Hero section
│   │   ├── ProjectCard.tsx  # Project display card
│   │   └── VideoPlayer.tsx  # Video.js wrapper
│   ├── pages/
│   │   └── Home.tsx      # Main home page
│   ├── App.tsx           # Router setup
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
└── dist/                 # Production build output
```

## Deployment to AWS

### Option 1: AWS Amplify (Recommended)

The simplest deployment option with automatic CI/CD:

1. Install AWS Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```

2. Initialize Amplify in your project:
```bash
amplify init
```

3. Add hosting:
```bash
amplify add hosting
```
Select "Hosting with Amplify Console"

4. Publish:
```bash
amplify publish
```

5. Connect custom domain in AWS Amplify Console:
   - Go to App Settings > Domain Management
   - Add `elliotboschwitz.com`
   - Follow DNS configuration instructions

### Option 2: S3 + CloudFront

For more control over the infrastructure:

1. Build the project:
```bash
npm run build
```

2. Create an S3 bucket:
```bash
aws s3 mb s3://elliotboschwitz-portfolio
```

3. Configure bucket for static website hosting:
```bash
aws s3 website s3://elliotboschwitz-portfolio \
  --index-document index.html \
  --error-document index.html
```

4. Upload build files:
```bash
aws s3 sync dist/ s3://elliotboschwitz-portfolio --delete
```

5. Create CloudFront distribution:
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Error pages: Configure 404 to serve `index.html` for SPA routing

6. Configure custom domain:
   - Add CNAME record in Route 53 or your DNS provider
   - Add SSL certificate via ACM

## Video Hosting Setup

Videos are hosted on AWS S3 + CloudFront for optimal performance:

1. Create a separate S3 bucket for videos:
```bash
aws s3 mb s3://elliotboschwitz-videos
```

2. Upload your project videos:
```bash
aws s3 cp my-project-video.mp4 s3://elliotboschwitz-videos/projects/
```

3. Create a CloudFront distribution for the video bucket

4. Update video URLs in your project cards to use the CloudFront URL:
```tsx
<ProjectCard
  title="My iOS App"
  description="Description..."
  videoUrl="https://d1234abcd.cloudfront.net/projects/my-project-video.mp4"
  links={[...]}
/>
```

## Customization

### Adding Projects

Edit [src/pages/Home.tsx](src/pages/Home.tsx) and add your projects:

```tsx
<ProjectCard
  title="Your Project Name"
  description="Brief description"
  videoUrl="https://your-cdn.com/video.mp4"
  links={[
    { label: "GitHub", url: "https://github.com/..." },
    { label: "App Store", url: "https://apps.apple.com/..." }
  ]}
/>
```

### Styling

The site uses Tailwind CSS v4. Customize colors, fonts, and other design tokens in [tailwind.config.js](tailwind.config.js).

### Contact Links

Update the contact section in [src/pages/Home.tsx](src/pages/Home.tsx) with your actual links:

- GitHub profile
- LinkedIn profile
- Email address

## License

MIT
