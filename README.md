# Minecraft AFK Farm Bot

An automated Minecraft bot using mineflayer that automatically detects and kills mobs for XP farming while you're AFK.

## Features

- ✅ Secure credentials using `.env` file
- ✅ Auto-login with `/login` command support
- ✅ Automatic mob detection and attack
- ✅ Sword equipping from hotbar
- ✅ Continuous XP farming
- ✅ Graceful error handling and auto-reconnect
- ✅ Configurable attack distance and speed

## Prerequisites

- **Node.js** v16.0.0 or higher ([Download](https://nodejs.org/))
- **Minecraft Server** (Java Edition)
- **Bot account** on the server (can reuse existing player account)

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "<your-project-path>"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

4. **Configure your server details**
   Edit `.env` with your server information:
   ```env
   SERVER_IP=your.server.ip
   SERVER_PORT=25565
   BOT_USERNAME=your_bot_username
   BOT_PASSWORD=your_password
   LOGIN_PASSWORD=your_login_command_password
   MOB_ATTACK_DISTANCE=3
   ATTACK_SPEED=10
   DEBUG=false
   ```

## Configuration

### `.env` Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SERVER_IP` | Server IP address or hostname | `localhost` or `mc.example.com` |
| `SERVER_PORT` | Server port (default: 25565) | `25565` |
| `BOT_USERNAME` | Bot account username | `AFKBot` |
| `BOT_PASSWORD` | Bot account password (null for offline mode) | `mypassword123` |
| `LOGIN_PASSWORD` | Password for `/login` command (if required) | `farmingpass` |
| `MINECRAFT_VERSION` | Force a specific game version if auto detection fails | `1.21.11` |
| `MINECRAFT_VERSION` | Force a specific game version if auto detection fails (e.g. `1.21.11`) | `1.21.11` |
| `MOB_ATTACK_DISTANCE` | Distance in blocks to attack mobs | `3` |
| `ATTACK_SPEED` | Interval between attack attempts, in **seconds** (float allowed); e.g. `0.01` for 10 ms, `3` to swing every 3 s | `0.01` |
| `DEBUG` | Enable debug logging | `false` |

## Usage

### Start the Bot

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

### Typical Console Output

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
[BOT] Bot position: { x: 100.5, y: 64, z: 200.5 }
[BOT] Starting mob detection loop...
[BOT] Found mob! Type: zombie, Distance: 2.85
[BOT] Equipped: diamond_sword
```

## Setup Instructions for AFK Farm

1. **Position the bot** at your mob farm/killing chamber
2. **Ensure mobs spawn** in front of the bot
3. **Place sword in hotbar** (any slot 0-8)
4. **Run the bot** - it will stay in place and attack mobs
5. **Go AFK** - the bot will continuously farm XP

## Supported Mobs

The bot automatically detects and attacks:
- Zombie, Zombie Pigman, Husk, Drowned, Zombie Villager
- Skeleton, Stray, Wither Skeleton
- Creeper
- Spider, Cave Spider
- Slime, Magma Cube
- Enderman, Endermite
- Ghast, Blaze
- Witch
- Guardian, Shulker
- Pillager, Ravager, Vindicator, Evoker, Vex
- Phantom
- Hoglin, Piglin
- Strider
- Wither, Ender Dragon

## Troubleshooting

### Bot doesn't connect
- Check server IP and port in `.env`
- Ensure the bot account exists on the server
- Verify firewall isn't blocking the connection

### Bot doesn't attack mobs
- Verify mobs are within attack distance (default: 3 blocks)
- Check that sword is in inventory
- Enable DEBUG mode to see detailed logs: `DEBUG=true` in `.env`

### Bot disconnects frequently
- Check server logs for ban/kick reasons
- Verify bot account is not passworded incorrectly
- Ensure sufficient memory and CPU

### Sword not equipping
- Verify sword exists in bot's inventory
- Supported sword types: all wooden, stone, iron, diamond, golden, netherite swords

## Advanced Configuration

### Increase Attack Speed
Lower the `ATTACK_SPEED` value (in milliseconds):
```env
ATTACK_SPEED=5  # Faster attacks (every 5ms)
```

### Increase Attack Range
Increase the `MOB_ATTACK_DISTANCE` value (in blocks):
```env
MOB_ATTACK_DISTANCE=5  # Attack mobs up to 5 blocks away
```

### Enable Debug Mode
```env
DEBUG=true  # See all messages and detailed logs
```

## Security Notes

⚠️ **IMPORTANT:**
- **Never commit `.env` file to git** - it contains sensitive credentials
- The `.gitignore` file is configured to prevent accidental commits
- Use strong passwords for bot accounts
- Keep bot username/password confidential
- Consider using a separate account just for farming

## Error Codes

| Code | Meaning |
|------|---------|
| `[BOT]` | Normal bot operation |
| `[MSG]` | Server message received |
| `[WARNING]` | Non-critical issue (bot continues) |
| `[ERROR]` | Error occurred but bot recovers |
| `[FATAL]` | Critical error, bot will exit |

## Performance Tips

1. **Adjust `ATTACK_SPEED`** - Balance between CPU usage and attack frequency
2. **Set appropriate `MOB_ATTACK_DISTANCE`** - Prevent attacking unintended mobs
3. **Monitor bot rotation** - Ensure the player character is rotated to face mobs
4. **Use local server** - Lower latency = faster attacks

## Stopping the Bot

Press `Ctrl + C` in the terminal to gracefully shut down the bot.

## License

MIT

## Support

For issues or questions:
1. Enable `DEBUG=true` to see detailed logs
2. Check console output for error messages
3. Verify `.env` configuration
4. Check bot positioning at farm location

---

**Happy Farming! 🎮**
