# FindMyCampus

> **Navigate Smart. Connect Faster.**  
> A modern, mobile-first campus navigation web app built with React + Vite.

---

## ✨ Features

- **Campus Map** — Interactive building map with animated route planner
- **Faculty Finder** — Search faculty by name, department, or availability
- **Bus Schedule** — View bus stops, routes & timings (weekday/weekend)
- **Accessibility Mode** — Accessible route navigation
- **Admin Dashboard** — Manage buildings, faculty info & bus data

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/SShreya22/FindMyCampus.git

# 2. Navigate into the project folder
cd FindMyCampus

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

## 🏗️ Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 🧱 Tech Stack

| Tool             | Purpose                     |
|------------------|-----------------------------|
| React 19 + Vite  | Frontend framework & bundler |
| Tailwind CSS     | Utility-first styling        |
| Framer Motion    | Animations & transitions     |
| React Router v7  | Client-side routing          |
| Lucide React     | Icons                        |

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Splash.jsx
│   ├── RoleSelection.jsx
│   ├── StudentLogin.jsx
│   ├── AdminLogin.jsx
│   ├── StudentDashboard.jsx
│   ├── CampusMap.jsx
│   ├── FacultyFinder.jsx
│   ├── BusSchedule.jsx
│   └── AdminDashboard.jsx
├── components/
│   ├── Navbar.jsx
│   ├── CardButton.jsx
│   ├── SearchBar.jsx
│   ├── Modal.jsx
│   └── RouteMap.jsx
├── context/
│   └── AppContext.jsx
└── data/
    ├── facultyData.js
    ├── busData.js
    └── buildingData.js
```

---

## 📱 Mobile-First Design

The app is designed for a **phone-like UI** (max-width 430px) centered on desktop, with a soft sage green & pastel blue color palette.

