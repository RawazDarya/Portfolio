# 🚀 Full-Stack Portfolio & Management Studio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring a dynamic content management studio and seamless user experience.

[![Portfolio](https://img.shields.io/badge/Live_Portfolio-brightgreen?style=for-the-badge)](https://rawazportfolio-nhx2mtw3m-abxrawazs-projects.vercel.app/) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 Portfolio Website
- **Responsive Design** - Fully responsive layout optimized for all devices
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Interactive Animations** - Smooth animations powered by Framer Motion
- **Dynamic Typing Effect** - Animated role titles in hero section
- **Contact Form** - Functional contact form integrated with EmailJS
- **Project Showcase** - Dynamic project cards with code previews
- **Tech Stack Display** - Interactive technology stack section
- **Certificates Gallery** - Professional certifications showcase
- **Services Section** - Detailed service offerings

### 🛠 Management Studio
- **Content Management** - Admin interface for managing portfolio content
- **Project Management** - CRUD operations for projects
- **Certificate Management** - Upload and manage certifications
- **Tech Stack Editor** - Dynamic technology stack management
- **Authentication** - Secure login system using Supabase
- **Real-time Updates** - Live content updates across the portfolio

## 🛡 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Heroicons** - Additional icon set

### Backend & Services
- **Express.js** - REST API server
- **Supabase** - Authentication and database
- **EmailJS** - Contact form email service
- **Node.js** - Runtime environment

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Deployment
- **Vercel** - Frontend hosting
- **SPA Configuration** - Single Page Application routing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
      ```bash   git clone https://github.com/RawazDarya/Portfolio.git   cd Portfolio   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Supabase Configuration (for Studio)
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Servers**
   
   **Frontend (Vite)**
   ```bash
   npm run dev
   ```
   
   **Backend (Express)**
   ```bash
   node server.js
   ```

5. **Open in browser**
   - Portfolio: `http://localhost:5173`
   - API Server: `http://localhost:3001`

## 📧 EmailJS Setup

For a fully functional contact form, follow the [EmailJS Setup Guide](./EMAILJS_SETUP.md) included in this repository.

## 🎯 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── portfolio/      # Portfolio-specific components
│   │   └── Studio/         # Admin studio components
│   ├── data/              # Static data files
│   ├── hooks/             # Custom React hooks
│   ├── types.ts           # TypeScript type definitions
│   └── main.tsx           # Application entry point
├── server.js              # Express API server
└── README.md              # This file
```

## 🌟 Key Features Breakdown

### Portfolio Sections
- **Hero** - Dynamic introduction with animated typing effect
- **Tech Stack** - Interactive technology showcase
- **About** - Personal background and experience
- **Services** - Professional service offerings
- **Projects** - Portfolio project gallery with live demos
- **Certificates** - Professional certifications display
- **Contact** - Functional contact form with validation

### Studio Management
- **Dashboard** - Overview of portfolio content
- **Project Editor** - Add, edit, and delete projects
- **Certificate Manager** - Upload and organize certifications
- **Tech Stack Editor** - Manage technology proficiencies
- **Authentication** - Secure access control

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📋 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥 Large screens (1440px+)

## 🎨 Customization

### Colors & Themes
The design system uses CSS custom properties for easy theme customization:
- Primary colors defined in `tailwind.config.js`
- Dark/light mode toggle functionality
- Smooth theme transitions

### Content Management
- Projects: Edit `src/data/projects.ts`
- Studio: Use the admin interface at `/studio`
- Styling: Customize in component files or Tailwind config

## 📈 Performance Features

- **Code Splitting** - Optimized bundle sizes
- **Lazy Loading** - Dynamic imports for better performance
- **Image Optimization** - Optimized image loading
- **SEO Friendly** - Meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About

Built with ❤️ by **Rawaz Darya**
- 🌐 Portfolio: [Live Site](https://rawazportfolio-nhx2mtw3m-abxrawazs-projects.vercel.app/)
- 💼 LinkedIn: [Rawaz Darya](https://www.linkedin.com/in/rawaz-darya-259253221/)
- 🐙 GitHub: [RawazDarya](https://github.com/RawazDarya)
- 📧 Email: rawazd.akram@gmail.com

---

⭐ **Star this repository if you found it helpful!** 