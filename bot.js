require('dotenv').config();
const mineflayer = require('mineflayer');

// Configuration from .env file
const options = {
  host: process.env.SERVER_IP || 'localhost',
  port: parseInt(process.env.SERVER_PORT) || 25565,
  username: process.env.BOT_USERNAME || 'AFKBot',
  password: process.env.BOT_PASSWORD || null, // Use null for offline-mode servers
  version: process.env.MINECRAFT_VERSION || 'auto', // override if autodetect fails
};

// Bot configuration
const CONFIG = {
  MOB_ATTACK_DISTANCE: parseFloat(process.env.MOB_ATTACK_DISTANCE) || 3,
    ATTACK_SPEED: parseFloat(process.env.ATTACK_SPEED) || 0.01,
  LOGIN_PASSWORD: process.env.LOGIN_PASSWORD || '',
  DEBUG: process.env.DEBUG === 'true',
};

// Bot state
let bot = null;
let isAttacking = false;
let targetMob = null;

/**
 * Initialize the bot and connect to server
 */
function createBot() {
  console.log(`[BOT] Connecting to ${options.host}:${options.port}...`);
  
  bot = mineflayer.createBot(options);

  // Bot spawned successfully
  bot.on('spawn', () => {
    console.log('[BOT] Bot spawned successfully!');
    onBotSpawn();
  });

  // Handle login message (for servers with auth plugins)
  bot.on('message', (message) => {
    const messageText = message.toString().toLowerCase();
    if (CONFIG.DEBUG) {
      console.log('[MSG]', message.toString());
    }
    
    // Check if login command is needed
    if (messageText.includes('login') || messageText.includes('please log in')) {
      setTimeout(() => {
        executeLoginCommand();
      }, 1000);
    }
  });

  // Handle errors
  bot.on('error', (err) => {
    console.error('[ERROR] Bot error:', err);
    // common failure when version autodetect returns null
    if (err && err.message && err.message.toLowerCase().includes('version')) {
      console.error('[HINT] Game version could not be determined.');
      console.error('[HINT] Set MINECRAFT_VERSION in your .env to e.g. 1.21.11');
    }
  });

  // Handle end
  bot.on('end', () => {
    console.log('[BOT] Bot disconnected, reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  // Handle kicked
  bot.on('kicked', (reason, yellowMessage) => {
    console.log('[KICKED] Reason:', reason);
    console.log('[KICKED] Message:', yellowMessage?.toString());
  });
}

/**
 * Execute login command
 */
function executeLoginCommand() {
  if (!bot) return;
  
  try {
    console.log('[BOT] Sending login command...');
    bot.chat(`/login ${CONFIG.LOGIN_PASSWORD}`);
    console.log('[BOT] Login command sent!');
  } catch (err) {
    console.error('[ERROR] Failed to send login command:', err);
  }
}

/**
 * Called when bot spawns - start mob attack loop
 */
function onBotSpawn() {
  console.log('[BOT] Bot position:', bot.entity.position);
  console.log('[BOT] Starting mob detection loop...');
  
    // Start the attack loop (convert seconds to milliseconds)
    setInterval(attackNearbyMobs, CONFIG.ATTACK_SPEED * 1000);
}

/**
 * Equip sword from hotbar
 */
function equipSword() {
  try {
    // swords have names ending in "_sword" in vanilla or contain "sword"
    // we'll also fallback to checking against well‑known item type IDs.
    const sword = bot.inventory.items().find(item => {
      if (!item) return false;
      const nm = item.name || '';
      if (nm.toLowerCase().includes('sword')) return true;
      // numeric types by version (wooden..netherite)
      return [268,269,270,271,272,273,474,475,476,477,478,279,283,284,285,286,287,288].includes(item.type);
    });

    if (sword) {
      bot.equip(sword, 'hand');
      if (CONFIG.DEBUG) {
        console.log('[BOT] Equipped:', sword.name, `(slot ${sword.slot})`);
      }
      return true;
    } else {
      console.warn('[WARNING] No sword found in inventory! Listing contents:');
      bot.inventory.items().forEach(i => {
        console.log('   ', i.name, 'x'+i.count, `(slot ${i.slot})`);
      });
      return false;
    }
  } catch (err) {
    console.error('[ERROR] Failed to equip sword:', err);
    return false;
  }
}

/**
 * Find and attack nearby mobs
 */
function attackNearbyMobs() {
  if (!bot || !bot.entity || !bot.entity.position) return;

  try {
    // Get all entities nearby
    const entities = Object.values(bot.entities);
    
    // Filter for mobs (hostile mobs)
    const mobs = entities.filter(entity => {
      if (!entity || !entity.position) return false;
      
      // Check if it's a mob (entity type check)
      const mobTypes = [
        'creeper', 'skeleton', 'spider', 'zombie', 'slime',
        'enderman', 'cave_spider', 'ghast', 'zombie_pigman',
        'pig_zombie', 'magma_cube', 'wither_skeleton', 'blaze',
        'silverfish', 'husk', 'stray', 'wither', 'ender_dragon',
        'endermite', 'guardian', 'shulker', 'pillager', 'ravager',
        'vindicator', 'evoker', 'vex', 'phantom', 'drowned',
        'zombie_villager', 'witch', 'hoglin', 'piglin', 'strider'
      ];
      
      const entityName = (entity.name || entity.type || '').toLowerCase();
      return mobTypes.some(mobType => entityName.includes(mobType));
    });

    if (mobs.length === 0) {
      if (isAttacking) {
        console.log('[BOT] No mobs nearby, stopping attack');
        isAttacking = false;
        targetMob = null;
      }
      return;
    }

    // Find closest mob
    let closestMob = null;
    let closestDistance = CONFIG.MOB_ATTACK_DISTANCE + 1;

    for (const mob of mobs) {
      const distance = bot.entity.position.distanceTo(mob.position);
      
      if (distance < closestDistance && distance > 0) {
        closestDistance = distance;
        closestMob = mob;
      }
    }

    // Attack the closest mob if within range
    if (closestMob && closestDistance <= CONFIG.MOB_ATTACK_DISTANCE) {
      if (!isAttacking || targetMob !== closestMob) {
        console.log(`[BOT] Found mob! Type: ${closestMob.name}, Distance: ${closestDistance.toFixed(2)}`);
        equipSword();
        isAttacking = true;
        targetMob = closestMob;
      }

      // Attack the mob
      try {
        bot.attack(closestMob);
      } catch (err) {
        console.error('[ERROR] Failed to attack mob:', err);
      }
    } else if (isAttacking) {
      console.log('[BOT] Mob out of range, stopping attack');
      isAttacking = false;
      targetMob = null;
    }

  } catch (err) {
    console.error('[ERROR] Error in attack loop:', err);
  }
}

/**
 * Handle SIGINT to gracefully exit
 */
process.on('SIGINT', () => {
  console.log('\n[BOT] Shutting down gracefully...');
  if (bot) {
    bot.quit();
  }
  process.exit(0);
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught exception:', err);
  if (bot) {
    bot.quit();
  }
  process.exit(1);
});

// Start the bot
console.log('='.repeat(50));
console.log('Minecraft AFK Farm Bot - Starting...');
console.log('='.repeat(50));
console.log(`Configuration:`);
console.log(`  Server: ${options.host}:${options.port}`);
console.log(`  Username: ${options.username}`);
console.log(`  Attack Distance: ${CONFIG.MOB_ATTACK_DISTANCE}`);
console.log(`  Attack Speed: ${CONFIG.ATTACK_SPEED}ms`);
console.log(`  Debug Mode: ${CONFIG.DEBUG}`);
console.log('='.repeat(50));

createBot();
