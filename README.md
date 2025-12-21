## El Pollo Loco

A fun 2D platformer game where you play as Pepe, a brave character who must defeat enemies and collect items while facing off against the final boss!

## 🎮 Game Overview

Navigate through three exciting levels, defeat chickens and baby chicks, collect coins and salsa bottles, and ultimately face the mighty boss in an epic showdown!

## 🎯 Gameplay Features

Collectibles

Coins  - Collect up to 25 coins to fill your coin bar
Salsa Bottles - Collect up to 5 bottles to use as throwable weapons

Enemies

Chickens 🐔 - Regular enemies that can be defeated with bottles
Baby Chicks 🐤 - Smaller enemies
Boss 👹 - The final challenge with multiple hit points

UI Elements

Health Bar ❤️ - Shows Pepe's remaining health
Coin Bar 💰 - Displays collected coins (max 25)
Bottle Bar 🍾 - Shows available bottles (max 5)
Boss Bar 💀 - Appears when fighting the boss

## 🏗️ Project Structure

```text
├── index.html
├── js/
│   ├── game.js                 # Main game initialization
│   ├── world.class.js          # Core game world logic
│   ├── collision-handler.js    # Collision detection system
│   ├── collectable-handler.js  # Item collection system
│   ├── models/
│   │   ├── character.class.js
│   │   ├── chicken.class.js
│   │   ├── boss.class.js
│   │   └── ...
│   └── levels/
│       ├── level1.js
│       ├── level2.js
│       └── level3.js
├── img/                        # Game sprites and graphics
├── audio/                      # Sound effects and music
└── styles/                     # CSS styling
```

## 🎨 Technical Details

Architecture

Object-Oriented Design - Clean class structure for all game entities
Modular System - Separate handlers for collisions and collectables
Canvas Rendering - HTML5 Canvas for smooth 2D graphics
Animation System - Sprite-based animations for characters and objects

Key Classes

World - Main game world controller
Character - Player character with movement and combat
CollisionHandler - Manages all collision detection
CollectableHandler - Handles item collection logic
MovableObject - Base class for all animated objects
Level - Level configuration and enemy placement

🚀 Getting Started

Clone or download the repository
Open index.html in a modern web browser
Click "Start Game" and enjoy!

🎵 Audio

The game features:

Background music
Sound effects for jumping, collecting items, and combat
Victory and game over themes

📝 Game States

Title Screen - Main menu
Playing - Active gameplay
Level Transition - Between levels
Won - Victory screen after defeating the boss
Lost - Game over screen when health reaches zero

🛠️ Development

Built with:

Vanilla JavaScript (ES6+)
HTML5 Canvas API
CSS3
Object-Oriented Programming principles

🎯 Win Condition
Defeat the boss by hitting it with salsa bottles until its health bar is depleted!

💀 Lose Condition
If Pepe's health reaches zero from enemy collisions, the game is over.

## 🔄 Features

Three Progressive Levels - Increasing difficulty
Dynamic Enemy Spawning - Safe spawn positions to avoid clustering
Responsive Controls - Smooth keyboard input handling
Visual Feedback - Health, coin, and bottle bars
Sound Integration - Full audio experience
Restart Functionality - Quick restart after win/lose

📜 License
This project is for educational purposes.

🎮 Have Fun!
Enjoy playing El Pollo Loco and good luck defeating the boss!