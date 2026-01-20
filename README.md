
# TaskBoard Pro - Advanced Task Management Application

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple.svg)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-green.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.15.0-pink.svg)](https://www.framer.com/motion/)

## 🚀 Overview

TaskBoard Pro is a modern, feature-rich task management application built with React, TypeScript, and Redux Toolkit. It provides an intuitive interface for managing tasks with advanced features like subtasks, priority levels, categories, search, filtering, and sorting capabilities.

## 🌐 Live Demo

The application is deployed and accessible at:  
[https://react-js-sample-9225.vercel.app](https://react-js-sample-9225.vercel.app)

---

## ✨ Features

### Core Features
- **User Authentication**: Secure signup/login system with localStorage persistence
- **Task Management**: Create, edit, delete, and duplicate tasks
- **Task Completion**: Mark tasks as complete/incomplete with visual feedback
- **Real-time Updates**: Instant UI updates with optimistic rendering

### Advanced Features
- **Subtasks**: Break down complex tasks into manageable subtasks
- **Priority Levels**: Assign priority (High, Medium, Low) with visual indicators
- **Categories**: Organize tasks by categories (Work, Personal, Shopping, Health, Education)
- **Due Dates**: Set and track task deadlines with overdue detection
- **Search & Filter**: Find tasks quickly with search and filter by status
- **Sorting Options**: Sort by due date, priority, creation date, or title
- **Task Statistics**: Visual dashboard showing task completion metrics
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Toast Notifications**: Real-time feedback for user actions
- **Random Profile Images**: Dynamic profile pictures from Picsum API
- **Accessibility**: Keyboard navigation and screen reader support
- **Progressive Enhancement**: Works without JavaScript enabled

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full IntelliSense
- **Redux Toolkit**: Predictable state management with RTK
- **React-Redux**: Official React bindings for Redux

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality component library
- **Framer Motion**: Production-ready motion library
- **Lucide React**: Beautiful icon library
- **React Hook Form**: Performant form handling

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskboard-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── LoginPage.tsx    # User authentication
│   ├── SignupPage.tsx   # User registration
│   ├── TaskBoard.tsx    # Main dashboard
│   ├── TaskItem.tsx     # Individual task component
│   ├── TaskModal.tsx    # Task creation/editing
│   ├── TaskStats.tsx    # Statistics dashboard
│   ├── TaskFilters.tsx  # Search and filter controls
│   └── ui/              # Reusable UI components
├── store/               # Redux store configuration
│   ├── store.ts         # Store setup
│   ├── authSlice.ts     # Authentication state
│   └── tasksSlice.ts    # Tasks state management
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication hook
│   └── use-toast.ts     # Toast notifications
├── lib/                 # Utility functions
│   └── utils.ts         # Common utilities
├── pages/               # Page components
│   └── Index.tsx        # Main entry point
├── App.tsx              # Root component
└── main.tsx             # Application entry
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. The application uses localStorage for data persistence.

### Customization
- **Categories**: Modify default categories in `src/store/tasksSlice.ts`
- **Theme**: Customize colors in `tailwind.config.ts`
- **API Integration**: Replace localStorage with real API in Redux slices

## 📱 Features Deep Dive

### Task Management
- **Create Tasks**: Rich form with title, description, due date, priority, and category
- **Edit Tasks**: In-place editing with pre-filled forms
- **Delete Tasks**: Confirmation-free deletion with undo toast
- **Duplicate Tasks**: One-click task duplication
- **Subtasks**: Nested task items with progress tracking

### Filtering & Search
- **Status Filters**: All, Pending, Completed, Overdue
- **Search**: Real-time search across title, description, and category
- **Sorting**: Multiple sort options with intuitive UI
- **Visual Indicators**: Color-coded priority and status

### Data Persistence
- **Local Storage**: All data persists between sessions
- **User Isolation**: Each user's tasks are private
- **State Management**: Redux ensures consistent state

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layout for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch Friendly**: Large touch targets and gestures

## 🧪 API Integration

### Picsum Photos API
The application integrates with Picsum Photos API for random profile images:

```typescript
// Random profile image generation
const profileImage = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200`;
```

**API Response Example:**
```json
{
  "id": "77",
  "author": "Alejandro Escamilla",
  "width": 5000,
  "height": 3333,
  "url": "https://unsplash.com/photos/LNRyGwIJr5c",
  "download_url": "https://picsum.photos/id/1/5000/3333"
}
```

## 🔒 Security Considerations

### Data Storage
- Passwords are stored in localStorage (development only)
- Production deployment should use secure authentication
- Consider implementing JWT tokens for session management

### Input Validation
- Form validation with React Hook Form
- TypeScript ensures type safety
- Sanitized user inputs

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment
1. Run `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server for SPA routing

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Task creation with all fields
- [ ] Task editing and updates
- [ ] Task completion toggle
- [ ] Subtask management
- [ ] Search functionality
- [ ] Filter and sort operations
- [ ] Mobile responsiveness
- [ ] Profile image loading

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Implement proper error boundaries
4. Write accessible HTML
5. Follow existing code style

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Picsum Photos** for providing random images API
- **Lucide** for beautiful icon library
- **Tailwind Labs** for the amazing CSS framework
- **Framer** for the smooth animation library
- **Redux Team** for predictable state management

## 📞 Support

For support, feature requests, or bug reports:
- Create an issue on GitHub
- Email: support@taskboardpro.com
- Documentation: [docs.taskboardpro.com](https://docs.taskboardpro.com)

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Dark/Light theme toggle
- [ ] Drag and drop task reordering
- [ ] Task templates
- [ ] Time tracking
- [ ] Team workspaces
- [ ] Advanced analytics

### Backend Integration
- [ ] REST API integration
- [ ] GraphQL support
- [ ] Real-time WebSocket updates
- [ ] Database persistence
- [ ] User authentication with JWT
- [ ] File upload and storage

---

**Built with ❤️ using modern web technologies**
#   A d v a n c e d - T a s k - M a n a g e m e n t - A p p l i c a t i o n  
 