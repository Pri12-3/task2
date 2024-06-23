// Import necessary libraries
import * as PIXI from 'pixi.js';

// Initialize the PIXI application
const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

// Load game assets
const loader = PIXI.Loader.shared;
loader.add('survivor', 'survivor.png');
loader.add('zombie', 'zombie.png');
loader.add('block', 'block.png');
loader.add('bullet', 'bullet.png');
loader.load(setup);

// Game setup function
function setup() {
  // Create the survivor
  const survivor = new PIXI.Sprite(loader.resources.survivor.texture);
  survivor.x = app.screen.width / 2;
  survivor.y = app.screen.height - survivor.height;
  app.stage.addChild(survivor);

  // Create the zombies
  const zombies = [];
  for (let i = 0; i < 10; i++) {
    const zombie = new PIXI.Sprite(loader.resources.zombie.texture);
    zombie.x = Math.random() * app.screen.width;
    zombie.y = -zombie.height;
    app.stage.addChild(zombie);
    zombies.push(zombie);
  }

  // Create the blocks
  const blocks = [];
  for (let i = 0; i < 10; i++) {
    const block = new PIXI.Sprite(loader.resources.block.texture);
    block.x = i * block.width;
    block.y = app.screen.height - block.height;
    app.stage.addChild(block);
    blocks.push(block);
  }

  // Game loop
  app.ticker.add((delta) => {
    // Move the zombies
    zombies.forEach((zombie) => {
      zombie.y += 2;
      if (zombie.y > app.screen.height) {
        zombie.y = -zombie.height;
        zombie.x = Math.random() * app.screen.width;
      }
    });

    // Shoot bullets
    if (app.keyboard.isDown(PIXI.KeyCodes.SPACE)) {
      const bullet = new PIXI.Sprite(loader.resources.bullet.texture);
      bullet.x = survivor.x + survivor.width / 2;
      bullet.y = survivor.y;
      bullet.vy = -10;
      app.stage.addChild(bullet);
      // Add bullet physics
                                     }
    else{
  });
}
