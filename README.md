# 🟦 The Box - Naughts and Crosses with MVC & Audio Feedback 🎵

A Responsive, browser-based Naughts and Crosses game built using vanilla JavaScript, CSS Grid/Flexbox, and the MVC (Model-View-Controller) architecture. Includes animations, and dynamic sound using the Tone.js audio library.

---

## 🚀 Features

- 🎮 Interactive 3x3 Naughts and Crosses board  
- 🧠 MVC Architecture (Model-View-Controller)  
- 🔁 Restart Game Button  
- 🖱️ Touch + Mouse Input Support  
- 🎼 Sound FX for wins & errors (Tone.js)  
- ✅ Valid move enforcement  
- ✅ Win detection with visual highlighting  
- 📐 Responsive layout using Flexbox and CSS Grid
- 🔄 Game reset via button  
- 🔊 Animations + audio for user feedback  

---

## 🏗️ Project Structure

project/
│
├── controller.js # Main controller (Controller Layer)
├── model.js # Game logic, win conditions (Model Layer)
├── view.js # UI rendering, DOM interaction, sounds (View Layer)
├── index.html # Page structure
├── box.css # Styles, responsive layout
└── README.md # You're here!

---

## 🔧 How to Run

Due to the use of **ES6 JavaScript modules**, this project must be served via a local development server — directly opening `index.html` in the browser will result in CORS/module loading errors.

### ✅ Recommended Options

#### 1. **Using VS Code with Live Server Extension**
If you're using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the **Live Server** extension by *Ritwick Dey*  
2. Right-click on `index.html` and choose **"Open with Live Server"**  
3. The game will open in your default browser at `http://127.0.0.1:5500/` or similar  

#### 2. **Using Node.js with `http-server`**

If you have [Node.js](https://nodejs.org/) installed:

```bash
# Install http-server globally
npm install -g http-server

# Navigate to the project directory
cd path/to/project

# Start the server
http-server

# Open the provided local URL (usually http://127.0.0.1:8080/)


## ⚙️ How It Works

### 🎯 MVC Architecture

**Model (`model.js`)**  
- Manages game data: `Game`, `Board`, `Space`  
- Handles win logic (vertical, horizontal, diagonal)  
- Tracks current player & board state  

**View (`view.js`)**  
- Renders board elements & players (`X`, `O`)  
- Plays win/error sounds  
- Updates visuals (win highlights, error flashes)  

**Controller (`controller.js`)**  
- Manages user input and connects model & view  
- Validates moves  
- Calls win check logic  
- Handles game reset  

---

### 🎵 Sound Feedback

Tone.js is used to synthesize two sound effects:
- ✅ **Win Sound**: Celebratory musical phrase  
- ❌ **Error Sound**: Quick dissonant cluster when invalid move attempted  

> Tone.js is loaded via CDN, no install needed.

---

## 🧪 Planned Features & Functionality

✅ = Completed  
🛠️ = In Progress / To Do  

- ✅ MVC Refactor  
- ✅ Game Logic & UI Rendering  
- ✅ Win/Draw Detection  
- ✅ Sound Effects  
- ✅ Restart Button  
- 🛠️ Add AI opponent logic  
- 🛠️ Unit Testing  
- 🛠️ Game State Persistence (refresh-proof)  
- 🛠️ Mobile / Touch Optimizations  
- 🛠️ Scalability improvements  
- 🛠️ Detailed code documentation  

---

## 📱 Responsive Design

- Uses **CSS Grid** for layout of board  
- Uses **Flexbox** for top bar and container alignment  
- **Media queries** can be added to enhance mobile support  

---

## 🧠 AI (Planned)

AI logic would be implemented inside the `GameController`:
- Choose a difficulty (random / defensive / offensive)  
- Simulate move choices  
- Prioritize win, block, center, corners, edges  

> Not yet implemented, but structure supports it.

---

📝 Developer Notes

Code is written in ES6 modules

Game logic is separated cleanly from DOM manipulation

AI and persistence are modular, easily expandable

Every function is logically grouped and scoped