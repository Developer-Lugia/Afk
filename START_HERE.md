# 🚀 START HERE - Setup Instructions

Welcome to the Minecraft AFK Farm Bot! Follow these steps to get your bot running.

## Prerequisites
- **Node.js v16 or higher** - [Download](https://nodejs.org/)
- **Minecraft Java Edition** server access
- **Bot account** on the server (optional - can reuse player account)
- **Sword** in your inventory for the bot to use

---

## Step 1: Install Dependencies

Open a terminal/command prompt in this folder and run:

```bash
npm install
```

This installs `mineflayer` (Minecraft bot library) and `dotenv` (for secure credentials).

**Expected output:**
```
added XX packages in X.XXs
```

---

## Step 2: Configure Your Server

Edit the `.env` file with your server details:

```env
# Your server IP and port
SERVER_IP=localhost
SERVER_PORT=25565

# Your bot account credentials
BOT_USERNAME=AFKBot
BOT_PASSWORD=your_password_here

# (Optional) Version override if auto-detection fails
# e.g. for a 1.21.11 server:
MINECRAFT_VERSION=1.21.11

# Leave empty if your server doesn't use auth plugins
LOGIN_PASSWORD=

# Bot behavior (adjust if needed)
MOB_ATTACK_DISTANCE=3
ATTACK_SPEED=10
DEBUG=false
```

### Need help finding your server info?

| Setting | Where to find it |
|---------|-----------------|
| **SERVER_IP** | In your server settings or ask admin.<br>Localhost servers: `localhost`<br>Aternos, etc: Check server page |
| **SERVER_PORT** | Usually `25565`.<br>Check `server.properties` file |
| **BOT_USERNAME** | Any name, or your Minecraft username |
| **BOT_PASSWORD** | Your password (empty for offline servers) |

**⚠️ Security Note:** Never share your `.env` file! It contains sensitive information.

---

## Step 3: Prepare Your AFK Farm

1. **Position yourself** at your mob farm killing chamber
2. **Make sure sword is in inventory** (any durability is fine)
3. **Mobs should spawn ahead of you** (not behind/to the side)
4. **Don't move** - bot will stay in one place

---

## Step 4: Test Connection (Optional but Recommended)

Before running the main bot, test if it can connect:

```bash
npm run test-connection
```

This will:
- ✓ Connect to your server
- ✓ Verify credentials are correct  
- ✓ Show your bot's spawn location
- ✓ Report any connection errors

**Expected output when successful:**
```
✓ Connected to server
✓ Bot spawned successfully
✓ All tests passed!
```

---

## Step 5: Check Bot Inventory (Optional)

Verify the bot has a sword:

```bash
npm run check-inventory
```

This shows:
- All items in bot's inventory
- Equipment (held item, armor)
- Whether a sword is available

---

## Step 6: Start the Bot!

```bash
npm start
```

**Expected output:**
```
==================================================
Minecraft AFK Farm Bot - Starting...
==================================================
Configuration:
  Server: localhost:25565
  Username: AFKBot
  Attack Distance: 3
  Attack Speed: 10ms
  Debug Mode: false
==================================================
[BOT] Connecting to localhost:25565...
[BOT] Bot spawned successfully!
[BOT] Starting mob detection loop...
```

---

## What the Bot Does

✅ Connects to your server and logs in  
✅ Stays in one place (doesn't move)  
✅ Detects mobs nearby  
✅ Equips sword from inventory  
✅ Attacks mobs continuously  
✅ Keeps attacking until mobs are dead  
✅ Collects XP automatically  
✅ Reconnects if disconnected  

---

## Stopping the Bot

Press `Ctrl + C` in the terminal to safely shut down the bot.

---

## Troubleshooting

### Bot won't connect
```bash
# Test connection first
npm run test-connection

# Check:
# - SERVER_IP is correct
# - SERVER_PORT is correct  
# - Server is online
# - Credentials are correct
```

### Bot connects but doesn't attack
```bash
# Check bot's inventory
npm run check-inventory

# Verify:
# - Sword exists in inventory
# - Mobs are spawning nearby
# - MOB_ATTACK_DISTANCE is high enough (try 4-5)
```

### Authentication failed
- **Offline server**: Leave `BOT_PASSWORD` empty
- **Online server**: Use correct password
- **Auth plugin**: Fill in `LOGIN_PASSWORD`

### See detailed logs
Edit `.env`:
```env
DEBUG=true
```

Then restart the bot - you'll see all messages and entity details.

---

## Important Files

| File | Purpose |
|------|---------|
| `bot.js` | Main bot code (what runs) |
| `.env` | Your configuration (KEEP SECRET!) |
| `.env.example` | Configuration template |
| `README.md` | Full documentation |
| `QUICK_REFERENCE.md` | Quick command reference |

---

## Next Steps

1. **Configure `.env`** with your server details
2. **Test connection** with `npm run test-connection`
3. **Start bot** with `npm start`
4. **Go AFK** while your bot farms XP!

---

## Need Help?

📖 **Read the full documentation:**
- `README.md` - Complete guide
- `QUICK_REFERENCE.md` - Quick lookup
- `SETUP_GUIDE.js` - Detailed setup
- `bot.js` - Source code with comments

---

## FAQ

**Q: Can I use my main account?**  
A: Yes, but it's recommended to use a separate account for the bot.

**Q: Will my main account be where the bot farms?**  
A: Yes, if you set `BOT_USERNAME` to your main account, that's where the bot will be.

**Q: Can I run multiple bots?**  
A: Not with the same account. Create multiple bots with different accounts and run them separately.

**Q: What if the bot disconnects?**  
A: It will automatically try to reconnect every 10 seconds. Check for error messages in the console.

**Q: My farm isn't working?**  
A: Make sure mobs are spawning within the attack distance (default 3 blocks). Try increasing `MOB_ATTACK_DISTANCE` to 4-5.

---

## Common Commands

```bash
# Start bot
npm start

# Test connection
npm run test-connection

# Check inventory
npm run check-inventory

# Stop bot
Ctrl + C

# Update dependencies
npm update

# Check Node version
node --version
```

---

## You're All Set! 🎮

Your bot is ready to farm. Have fun! 

If you encounter issues, check the troubleshooting section above or read the full documentation in `README.md`.

---

**Happy Farming!** ⛏️
