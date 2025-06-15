# Interactive Resume - Gary Robinson, III

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://your-github-pages-url)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-blue)](https://nodejs.org)

An interactive single-page application (SPA) serving as an online resume for Gary Robinson, III. This project showcases:
- Professional Summary
- Technical Skills with Interactive Tooltips
- Recent Projects with Detailed Descriptions
- Interactive Career Timeline
- Educational Background
- Secure Contact Form (via Node.js Backend)

## Project Structure

```
my-interactive-resume/
├── client/                 # Frontend (HTML, CSS, JavaScript)
│   ├── index.html          # Main page
│   ├── css/
│   │   └── style.css       # Custom CSS styles
│   └── js/
│       └── script.js       # All JavaScript logic, including contact form submission
├── server/                 # Backend (Node.js/Express)
│   ├── server.js           # Express server to handle contact form and send emails
│   ├── package.json        # Node.js dependencies for the backend
│   └── .env.example        # Example environment variables (DO NOT COMMIT .env)
├── .gitignore              # Specifies files/directories to ignore in Git
└── README.md               # This file
```

## Features

- ✨ **Responsive Design**: Optimized for various screen sizes (mobile, tablet, desktop) using Tailwind CSS
- 🎯 **Interactive Skills**: Categorized skill lists with hover-over tooltips showing associated companies
- 🏗️ **Recent Projects**: Tile-based display of projects with descriptions, skill tags, and links to GitHub Pages
- 📅 **Career Timeline**: Interactive timeline of professional experience, expandable for detailed achievements and skills used per role
- 📧 **Contact Form**: Securely sends messages to the specified email address via a Node.js backend

## Getting Started

### Prerequisites

- Node.js (LTS version recommended) and npm (Node Package Manager) installed
- Git installed

### Local Setup

Clone the repository:
```bash
git clone https://github.com/your-username/my-interactive-resume.git
cd my-interactive-resume

#### Frontend Setup
The client/ directory contains the static frontend files. You can open client/index.html directly in your browser, but for fetch requests to the backend, it's best to serve it via a local web server (e.g., Live Server VS Code extension, or npx serve client).

#### Backend Setup
Navigate to the server/ directory:
```bash
cd server

Install dependencies:
```bash
npm install
```

Create a .env file in the server/ directory (copy from .env.example):
```bash
cp .env.example .env
```

Edit the .env file with your actual email credentials and recipient email. Do not use your main email password directly; use an App Password if using Gmail with 2FA enabled.

```
# .env
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_sending_email@gmail.com
EMAIL_PASS=your_email_app_password # IMPORTANT: Use an App Password for Gmail!
RECIPIENT_EMAIL=grobinson3@gmail.com
```

Start the backend server:
```bash
npm start
```

The server will run on http://localhost:3000 (or the port you configured).

**Important**: While testing locally, your frontend (e.g., file://... or http://127.0.0.1:5500) might face CORS issues when trying to fetch from http://localhost:3000. The cors middleware in server.js is set to allow all origins (app.use(cors())). For production, you should restrict this to your actual frontend domain (e.g., app.use(cors({ origin: 'https://your-github-pages-domain.com' })));.

## Deployment

This project requires two separate deployments:

### Frontend (GitHub Pages)

The client/ directory will be deployed to GitHub Pages.

1. Ensure your repository is public on GitHub
2. Create a file `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches:
      - main # Adjust to your main branch name (e.g., master)

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client # This tells GitHub Actions to deploy only the 'client' directory
          # If you use a custom domain, uncomment and set:
          # cname: your-custom-domain.com
```

3. GitHub Pages Settings:
   - Go to your GitHub repository settings
   - Navigate to the "Pages" section
   - Under "Source," select "Deploy from a branch" and choose the gh-pages branch
   - Ensure the directory selected is / (root) for the gh-pages branch
   - Save your changes

Your frontend will be automatically deployed to `https://your-username.github.io/your-repo-name/` whenever you push changes to your main branch.

### Backend (e.g., Render, Heroku, Vercel Functions)

The server/ directory needs to be deployed to a platform that supports Node.js applications or serverless functions.

#### Platform Options

- **Render.com**: Recommended for simple Node.js apps. Easy to set up with GitHub integration
- **Heroku**: Good for small Node.js apps with similar setup to Render
- **Vercel/Netlify Functions**: Excellent choices if you convert server.js to serverless function format
- **DigitalOcean/AWS EC2**: More control but requires more setup and maintenance

#### Environment Variables

On your chosen hosting platform, configure these environment variables from server/.env.example:
- `EMAIL_USER`
- `EMAIL_PASS`
- `RECIPIENT_EMAIL`

**Important**: Never hardcode these in server.js or commit them in .env.

#### Update Frontend

Once your backend is deployed, update the fetch URL in client/js/script.js:

```javascript
// Original (local development)
const response = await fetch('http://localhost:3000/send-email', {

// Update to your deployed backend URL
const response = await fetch('https://your-deployed-backend-url.com/send-email', {
```

Contributing
Feel free to fork this repository and customize it for your own resume. Pull requests are welcome for improvements or bug fixes.