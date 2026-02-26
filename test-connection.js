const mineflayer = require('mineflayer');

/**
 * Server Connection Tester
 * 
 * This script helps you test if your bot can connect to the server.
 * Use this to troubleshoot connection issues before running the main bot.
 * 
 * Usage: node test-connection.js
 */

require('dotenv').config();

const TEST_CONFIG = {
  host: process.env.SERVER_IP || 'localhost',
  port: parseInt(process.env.SERVER_PORT) || 25565,
  username: process.env.BOT_USERNAME || 'TestBot',
  password: process.env.BOT_PASSWORD || null,
  version: process.env.MINECRAFT_VERSION || 'auto',
};

console.log('╔════════════════════════════════════════════════════╗');
console.log('║   Minecraft Bot - Connection Tester              ║');
console.log('╚════════════════════════════════════════════════════╝');
console.log('');
console.log('Testing with configuration:');
console.log(`  Host:     ${TEST_CONFIG.host}`);
console.log(`  Port:     ${TEST_CONFIG.port}`);
console.log(`  Username: ${TEST_CONFIG.username}`);
console.log(`  Password: ${TEST_CONFIG.password ? '***hidden***' : 'none (offline-mode)'}`);
console.log(`  Version:  ${TEST_CONFIG.version}`);
console.log('');
console.log('Attempting to connect...');
console.log('');

let testBot = null;
let connectionSuccessful = false;
let timeout = null;

// Create timeout in case connection hangs
timeout = setTimeout(() => {
  console.log('❌ [TIMEOUT] Connection took too long (30 seconds)');
  console.log('   Possible causes:');
  console.log('   - Wrong server IP/port');
  console.log('   - Firewall blocking connection');
  console.log('   - Server is offline');
  console.log('   - Network connectivity issue');
  
  if (testBot) testBot.quit();
  process.exit(1);
}, 30000);

try {
  testBot = mineflayer.createBot(TEST_CONFIG);

  testBot.on('connect', () => {
    clearTimeout(timeout);
    console.log('✓ Connected to server');
  });

  testBot.on('spawn', () => {
    connectionSuccessful = true;
    console.log('✓ Bot spawned successfully');
    console.log('');
    console.log('Bot Information:');
    console.log(`  Entity ID: ${testBot.entity.id}`);
    console.log(`  Position:  X=${testBot.entity.position.x.toFixed(1)}, Y=${testBot.entity.position.y.toFixed(1)}, Z=${testBot.entity.position.z.toFixed(1)}`);
    console.log(`  Dimension: ${testBot.game.dimension}`);
    console.log(`  Mode:      ${testBot.game.gameMode}`);
    console.log('');
    console.log('✓ All tests passed! Your bot can connect to this server.');
    console.log('');
    
    testBot.quit();
    process.exit(0);
  });

  testBot.on('error', (err) => {
    clearTimeout(timeout);
    console.log('❌ Bot error:', err.message);
    console.log('');
    
    if (err.message.includes('getaddrinfo')) {
      console.log('Troubleshooting: Cannot resolve hostname');
      console.log('- Check server IP/hostname is correct');
      console.log('- Verify Internet connection');
      console.log('- Try using ping command');
    } else if (err.message.includes('ECONNREFUSED')) {
      console.log('Troubleshooting: Connection refused');
      console.log('- Server might not be running');
      console.log('- Wrong port number');
      console.log('- Firewall blocking connection');
    } else if (err.message.includes('ETIMEDOUT')) {
      console.log('Troubleshooting: Connection timeout');
      console.log('- Server not responding');
      console.log('- Network connectivity issue');
      console.log('- Firewall blocking port');
    }
    
    process.exit(1);
  });

  testBot.on('kicked', (reason, yellowMessage) => {
    clearTimeout(timeout);
    console.log('⚠ Bot was kicked from server');
    console.log('Reason:', reason);
    console.log('Message:', yellowMessage?.toString());
    console.log('');
    console.log('Possible causes:');
    
    if (reason.includes('whitelist') || reason.includes('Whitelisted')) {
      console.log('- Bot account not whitelisted');
      console.log('  → Add bot account to whitelist');
    } else if (reason.includes('ban')) {
      console.log('- Bot account is banned');
      console.log('  → Check server ban list');
    } else if (reason.includes('auth') || reason.includes('login')) {
      console.log('- Authentication failed');
      console.log('  → Check username/password');
      console.log('  → Check if account is registered');
      console.log('  → Check LOGIN_PASSWORD if auth plugin used');
    } else if (reason.includes('full')) {
      console.log('- Server is full');
      console.log('  → Wait for server slots to open');
    }
    
    process.exit(1);
  });

  testBot.on('end', () => {
    clearTimeout(timeout);
    if (connectionSuccessful) {
      console.log('Bot disconnected after successful test.');
    } else {
      console.log('❌ Connection ended unexpectedly');
      process.exit(1);
    }
  });

} catch (err) {
  clearTimeout(timeout);
  console.log('❌ Failed to create bot:', err.message);
  // if the error is related to version, provide guidance
    
    try {
        const md = require('minecraft-data');
        const allVersions = Object.keys(md.versionsByMinecraftVersion || md.versions || {});
        if (allVersions.length) {
        console.log('       Supported versions include (sample):', allVersions.slice(-5).join(', '));
        }
    } catch {}
  
  console.log('');
  console.log('This usually means:');
  console.log('- Mineflayer not installed (run: npm install)');
  console.log('- Node.js version too old (need v16+)');
  console.log('- Corrupted node_modules folder (try: npm install)');
  process.exit(1);
}
