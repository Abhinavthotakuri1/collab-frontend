# 🚀 Real-Time Collaborative Coding Platform

A real-time collaborative code editor that allows multiple users to write, edit, and execute code simultaneously — built with **React.js**, **Node.js**, **Socket.io**, and **Monaco Editor**.

> Think Google Docs, but for code — with live chat and code execution built in.

---

## ✨ Features

- 🔄 **Real-Time Collaboration** — Multiple users can edit the same code simultaneously with live synchronization
- 🖥️ **Monaco Editor** — Professional in-browser code editor (the same engine that powers VS Code) with syntax highlighting and auto-completion
- ▶️ **Code Execution** — Run code directly in the browser and see output instantly
- 💬 **Live Chat** — Built-in real-time chat so collaborators can communicate without leaving the platform
- ⚡ **Low Latency** — Optimized WebSocket event architecture for sub-100ms sync across all connected clients
- 👥 **Multi-User Rooms** — Multiple users can join the same session simultaneously

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Monaco Editor, Vite |
| Real-Time | Socket.io, WebSockets |
| Backend | Node.js |
| Styling | CSS |

---

## 📸 Demo

> Live demo: [collab-frontend-sigma](https://collab-frontend-sigma.vercel.app) *(update this link)*

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhinavthotakuri1/collab-frontend.git

# Navigate into the project
cd collab-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Backend Setup
> If you have a separate backend repo, link it here and add setup instructions.

---

## 📁 Project Structure

```
collab-frontend/
├── public/          # Static assets
├── src/             # React source code
│   ├── components/  # UI components (Editor, Chat, etc.)
│   ├── socket/      # Socket.io client setup
│   └── App.jsx      # Root component
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔧 How It Works

1. User creates or joins a room via a unique room code
2. All users in the room are connected via **Socket.io**
3. Every keystroke in the editor emits a `code-change` event to the server
4. The server broadcasts the change to all other users in the room in real time
5. Users can simultaneously chat and execute code without any page reload

---

## 🌱 Future Improvements

- [ ] User authentication and persistent rooms
- [ ] Support for more programming languages
- [ ] Video/voice calling integration
- [ ] File tree and multi-file editing
- [ ] Collaborative debugging

---

## 👨‍💻 Author

**Thotakuri Abhinav**
- GitHub: [@Abhinavthotakuri1](https://github.com/Abhinavthotakuri1)
- LeetCode: [Profile](https://leetcode.com/u/eHkXDChrih/)
- HackerRank: [Profile](https://www.hackerrank.com/profile/abhinavthotakur2)
- Email: abhinavthotakuri3@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
