const mineflayer = require('mineflayer');

/**
 * Bot Inventory & Equipment Checker
 * 
 * This script connects to the server and displays the bot's
 * inventory and equipment to help troubleshoot gear issues.
 * 
 * Usage: node check-inventory.js
 */

require('dotenv').config();

const options = {
  host: process.env.SERVER_IP || 'localhost',
  port: parseInt(process.env.SERVER_PORT) || 25565,
  username: process.env.BOT_USERNAME || 'TestBot',
  password: process.env.BOT_PASSWORD || null,
};

console.log('╔════════════════════════════════════════════════════╗');
console.log('║    Bot Inventory & Equipment Checker            ║');
console.log('╚════════════════════════════════════════════════════╝');
console.log('');

let bot = null;
let timeout = null;

timeout = setTimeout(() => {
  console.log('❌ [TIMEOUT] Took too long to connect');
  if (bot) bot.quit();
  process.exit(1);
}, 30000);

try {
  bot = mineflayer.createBot(options);

  bot.on('spawn', () => {
    console.log('✓ Connected to server and spawned!');
    console.log('');
    
    // Wait a moment for inventory to load
    setTimeout(() => {
      displayInventory();
      
      // Exit after displaying
      setTimeout(() => {
        bot.quit();
        process.exit(0);
      }, 1000);
    }, 1000);
  });

  bot.on('error', (err) => {
    clearTimeout(timeout);
    console.log('❌ Error:', err.message);
    process.exit(1);
  });

  bot.on('kicked', (reason) => {
    clearTimeout(timeout);
    console.log('❌ Kicked:', reason);
    process.exit(1);
  });

  function displayInventory() {
    const items = bot.inventory.items();
    
    console.log('═══════════════ BOT INVENTORY ═══════════════');
    console.log('');
    
    if (items.length === 0) {
      console.log('⚠ Inventory is EMPTY!');
      console.log('  → Add items to bot\'s inventory');
      console.log('  → At minimum: add a sword');
    } else {
      console.log(`Total items in inventory: ${items.length}\n`);
      
      items.forEach((item, index) => {
        const slot = bot.inventory.inventoryStart + index;
        const isHotbar = slot < 9;
        const hotbarMarker = isHotbar ? ` [HOTBAR SLOT ${slot}]` : '';
        
        console.log(`${index.toString().padStart(2)}. ${item.name.padEnd(20)} x${item.count}${hotbarMarker}`);
      });
    }
    
    console.log('');
    console.log('═══════════════ BOT EQUIPMENT ═══════════════');
    console.log('');
    
    const equipped = {
      'Hand': bot.heldItem,
      'Head': bot.equipment[3],
      'Chest': bot.equipment[2],
      'Legs': bot.equipment[1],
      'Feet': bot.equipment[0],
      'Off-hand': bot.equipment[4], // 1.9+
    };
    
    Object.entries(equipped).forEach(([slot, item]) => {
      if (item) {
        console.log(`${slot.padEnd(10)}: ${item.name}`);
      } else {
        console.log(`${slot.padEnd(10)}: empty`);
      }
    });
    
    console.log('');
    console.log('═══════════════ SWORD CHECK ═══════════════');
    console.log('');
    
    const swordTypes = ['diamond_sword', 'iron_sword', 'golden_sword', 'stone_sword', 
                        'wooden_sword', 'netherite_sword', 'sword'];
    
    const swords = items.filter(item => 
      swordTypes.some(type => item.name.toLowerCase().includes(type.toLowerCase()))
    );
    
    if (swords.length > 0) {
      console.log('✓ Swords found in inventory:');
      swords.forEach((sword, i) => {
        console.log(`  ${i + 1}. ${sword.name} x${sword.count}`);
      });
    } else {
      console.log('❌ NO SWORDS FOUND!');
      console.log('  → Add a sword to your inventory');
      console.log('  → Bot needs a sword to attack mobs');
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════');
  }

} catch (err) {
  clearTimeout(timeout);
  console.log('❌ Error:', err.message);
  process.exit(1);
}
