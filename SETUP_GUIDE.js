/**
 * Setup Configuration Guide
 * 
 * This file helps you understand how to configure your bot.
 * Follow the steps below to get your bot running.
 */

// STEP 1: Create a .env file
// Copy the content below into your .env file and fill in your values

const ENV_TEMPLATE = `
# ========================================
# MINECRAFT SERVER CONFIGURATION
# ========================================
SERVER_IP=localhost
SERVER_PORT=25565

# ========================================
# BOT ACCOUNT CREDENTIALS
# ========================================
# These are the login credentials for your bot account
# If the server is in offline-mode, you don't need a password
BOT_USERNAME=AFKBot
BOT_PASSWORD=your_password_here

# ========================================
# LOGIN COMMAND CONFIGURATION
# ========================================
# If your server uses an auth plugin (like LoginSecurity),
# fill in the password for the /login command here.
# Leave empty if not needed.
LOGIN_PASSWORD=

# ========================================
# BOT BEHAVIOR TUNING
# ========================================
# Distance in blocks to attack mobs (recommended: 2-4)
MOB_ATTACK_DISTANCE=3

# Attack check interval in milliseconds (lower = faster, but more CPU usage)
# Recommended: 5-20
ATTACK_SPEED=10

# Enable debug logging (true/false)
DEBUG=false
`;

// STEP 2: Common Server Types and their Configuration

const SERVER_CONFIGS = {
  'local_offline': {
    name: 'Local Offline Server',
    description: 'Single-player world opened to LAN',
    env: {
      SERVER_IP: 'localhost',
      SERVER_PORT: 25565,
      BOT_USERNAME: 'AFKBot',
      BOT_PASSWORD: null,
      LOGIN_PASSWORD: '',
    }
  },
  
  'local_online': {
    name: 'Local Online Server',
    description: 'Local server with online-mode enabled',
    env: {
      SERVER_IP: 'localhost',
      SERVER_PORT: 25565,
      BOT_USERNAME: 'YourBotUsername',
      BOT_PASSWORD: 'bot_microsoft_password',
      LOGIN_PASSWORD: '',
    }
  },
  
  'remote_server': {
    name: 'Remote Dedicated Server',
    description: 'External server (e.g., Aternos, Realm)',
    env: {
      SERVER_IP: 'your.server.ip',
      SERVER_PORT: 25565,
      BOT_USERNAME: 'YourBotUsername',
      BOT_PASSWORD: 'bot_password',
      LOGIN_PASSWORD: '',
    }
  },
  
  'auth_plugin': {
    name: 'Server with Auth Plugin (LoginSecurity)',
    description: 'Server requiring /login command',
    env: {
      SERVER_IP: 'your.server.ip',
      SERVER_PORT: 25565,
      BOT_USERNAME: 'BotUsername',
      BOT_PASSWORD: 'bot_password',
      LOGIN_PASSWORD: 'your_login_command_password',
    }
  },
};

// STEP 3: Finding Your Server Information

const FINDING_SERVER_INFO = {
  'SERVER_IP': `
    • Localhost: "localhost" or "127.0.0.1"
    • LAN: Right-click server in server list → Edit → Server Address
    • Remote: Check server provider or ask admin
    • Check router/DNS for port forwarding
  `,
  
  'SERVER_PORT': `
    • Default: 25565 (most servers)
    • Check server.properties file: "server-port=25565"
    • Ask your server admin if unsure
  `,
  
  'BOT_USERNAME': `
    • Can be any username
    • If online-mode: must be valid Minecraft account
    • Can reuse existing player account
    • Recommendation: Create separate account for farming bot
  `,
  
  'BOT_PASSWORD': `
    • For offline servers: null or empty
    • For online servers: your Minecraft account password
    • NOT needed if using offline-mode
  `,
  
  'LOGIN_PASSWORD': `
    • Only needed for servers with auth plugins
    • Common plugins: LoginSecurity, AuthMe, UltimateAuth
    • Set to empty "" if server doesn't have auth plugin
    • Check server info or ask admin
  `,
};

// STEP 4: MOB FARM SETUP

const FARM_SETUP = {
  location: {
    description: 'Set up your farm at the killing chamber',
    steps: [
      '1. Position the bot at your XP farm',
      '2. Mobs should spawn/appear AHEAD of the bot',
      '3. Bot does NOT move - stays in one place',
      '4. Ensure clear line of sight to mobs',
      '5. Sword should already be in hotbar (slots 0-8)',
    ]
  },
  
  requirements: {
    'Mob Spawner': 'Recommended for consistent spawning',
    'Drop Height': '20+ blocks for instant kill',
    'Collection System': 'Optional - XP flows to bot automatically',
    'Bot Positioning': 'Face the killing chamber/mob arena',
    'Sword': 'Must be in bot\'s inventory (any durability)',
  },

  mob_types: [
    'Zombie farm (most common)',
    'Skeleton farm',
    'Creeper farm',
    'Spider farm',
    'Pigman farm (Nether)',
    'Guardian farm (Ocean)',
    'Any mob farm (bot attacks all)',
  ]
};

// STEP 5: TROUBLESHOOTING

const TROUBLESHOOTING = {
  'Bot won\'t connect': {
    reason: 'Wrong server IP/port or firewall blocking',
    solutions: [
      'Verify SERVER_IP is correct (use "localhost" for local)',
      'Verify SERVER_PORT (default: 25565)',
      'Check firewall isn\'t blocking port',
      'Try pinging the server: ping <SERVER_IP>',
      'Check if server is running',
    ]
  },
  
  'Bot connects but doesn\'t attack': {
    reason: 'Mobs might not be in range or sword not equipped',
    solutions: [
      'Verify mobs are spawning nearby',
      'Check MOB_ATTACK_DISTANCE (try increasing to 4-5)',
      'Ensure sword is in bot inventory (not dropped)',
      'Enable DEBUG=true to see what\'s happening',
      'Check bot rotation - might need to rotate manually',
    ]
  },
  
  'Access denied / Authentication failed': {
    reason: 'Wrong username/password or account not registered',
    solutions: [
      'If offline-mode: BOT_PASSWORD should be null/empty',
      'If online-mode: use correct Microsoft password or password from server',
      'Register account on server if required',
      'Check if account is banned/whitelisted',
      'Some servers need /register command first',
    ]
  },
  
  'Bot attacks then stops': {
    reason: 'Mob out of range or bot desynced',
    solutions: [
      'Increase MOB_ATTACK_DISTANCE',
      'Increase ATTACK_SPEED (lower value = faster checks)',
      'Verify farm setup - mobs should consistently spawn',
      'Restart bot to reset any desyncs',
    ]
  },
  
  'High CPU usage': {
    reason: 'ATTACK_SPEED too fast',
    solutions: [
      'Increase ATTACK_SPEED value (e.g., 20ms instead of 5ms)',
      'Reduce MOB_ATTACK_DISTANCE',
      'Disable DEBUG mode',
      'Run on less resource-constrained machine',
    ]
  },
};

// STEP 6: PERFORMANCE TABLE

const PERFORMANCE_TUNING = `
╔═════════════════════════════════════════════════════════╗
║              PERFORMANCE TUNING GUIDE                   ║
╠═════════════════════════════════════════════════════════╣
║                                                         ║
║ SLOW ATTACKS (Low CPU, Fewer Attacks/sec)             ║
║ ─────────────────────────────────────────             ║
║ ATTACK_SPEED=50    →  20 attacks/sec                  ║
║ MOB_ATTACK_DISTANCE=2  (hits only very close mobs)    ║
║                                                       ║
║ Usage: Weak servers, low-end machines                 ║
║                                                       ║
╠═════════════════════════════════════════════════════════╣
║                                                         ║
║ BALANCED (Medium CPU, Good Attacks)                   ║
║ ───────────────────────────────────────               ║
║ ATTACK_SPEED=10    →  100 attacks/sec                 ║
║ MOB_ATTACK_DISTANCE=3 (good for most farms)          ║
║                                                       ║
║ Usage: Most setups, recommended default               ║
║                                                       ║
╠═════════════════════════════════════════════════════════╣
║                                                         ║
║ FAST ATTACKS (High CPU, Many Attacks/sec)             ║
║ ────────────────────────────────────────              ║
║ ATTACK_SPEED=5     →  200 attacks/sec                 ║
║ MOB_ATTACK_DISTANCE=5  (wide attack range)            ║
║                                                       ║
║ Usage: Powerful machines, max efficiency              ║
║                                                       ║
╚═════════════════════════════════════════════════════════╝
`;

// QUICK START CHECKLIST

const QUICK_START = `
╔═════════════════════════════════════════════════╗
║          QUICK START CHECKLIST                 ║
╠═════════════════════════════════════════════════╣
║                                                 ║
║ ☐ Node.js installed (v16+)                    ║
║   → Check: node --version                     ║
║                                                 ║
║ ☐ Project folder ready                        ║
║   → Check: ls (or dir on Windows)             ║
║                                                 ║
║ ☐ Dependencies installed                      ║
║   → Run: npm install                          ║
║                                                 ║
║ ☐ .env file created and configured            ║
║   → Copy .env.example to .env                 ║
║   → Edit .env with your server info           ║
║                                                 ║
║ ☐ Bot account ready                           ║
║   → Whitelisted on server (if needed)         ║
║   → Has correct password                      ║
║                                                 ║
║ ☐ Farm location prepared                      ║
║   → Mobs will spawn in front of bot           ║
║   → Sword in bot's hotbar                     ║
║                                                 ║
║ ☐ Server running and accessible               ║
║   → No firewall blocking port                 ║
║   → Server not full                           ║
║                                                 ║
║ 🚀 PROJECT READY!                             ║
║   → Run: npm start                            ║
║                                                 ║
╚═════════════════════════════════════════════════╝
`;

console.log(QUICK_START);
