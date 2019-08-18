// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;
let dots = 240;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
}

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
}

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
}

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
}

const ghosts = [inky, blinky, pinky, clyde];




// Draw the screen functionality
function drawScreen() {
  clearScreen();
  checkLives();

  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function checkLives() {
  if (lives < 0) {
    process.exit();
  }
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}\n`);
  console.log(`Power-Pellets: ${powerPellets}`);
  console.log(`Dots: ${dots}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line

  if (dots >= 1) { //Shows option to eat dots if Pac-Man has at least 1.
    console.log('(d) Eat Dot');
  
    if (dots >= 10) { //Shows option to eat 10 dots if Pac-Man has at least 10.
      console.log('(t) Eat 10 Dots');
    }

    if (dots >= 100) { //Shows option to eat 100 dots if Pac-Man has at least 100.
      console.log('(o) Eat 100 Dots');
    }

    console.log('(a) Eat all remaining Dots');
  }

  if (powerPellets >= 1) { //Pac-Man can only eat pellets if has at least 1 left.
    console.log('(p) Eat Power-Pellet');
  }

  ghosts.forEach(function (item) { 
    if (item['edible']) {
      currentState = 'edible';
    } else {
      currentState = 'inedible';
    }

    console.log(`(${item['menu_option']}) Eat ${item['name']} (${currentState})`); //(1) Eat Blinky (edible)

  })
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot(numToEat) {
  console.log('\nChomp!');
  dots -= numToEat;
  score += 10 * numToEat;
}

function eatPowerPellet() {
  score += 50;

  ghosts.forEach(function (item) {
    item['edible'] = true;
  })

  powerPellets -= 1
  console.log('\nEating a Power-Pellet!');
}

function eatGhost(ghost) {
  if (ghost['edible']) {
    console.log(`\nPac-Man ate ${ghost['name']}!`);
    score += 200;
    ghost['edible'] = false;
  } else {
    lives -= 1;
    console.log(`\n${ghost['name']} killed Pac-Man!`);
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      dots >= 1 
      ? eatDot(1)
      : console.log('\nNo Dots left!')
      break;
    case 't':
      dots >= 10 
      ? eatDot(10)
      : console.log('\nNot enough Dots left!')
      break;
    case 'o':
      dots >= 100 
      ? eatDot(100)
      : console.log('\nNot enough Dots left!')
      break;
    case 'a':
      dots >= 1 
      ? eatDot(dots)
      : console.log('\nNo Dots left!')
      break;
    case 'p':
      powerPellets >= 1 
      ? eatPowerPellet()
      : console.log('\nNo Power-Pellets left!')
      break;
    case '1':
      eatGhost(ghosts[0])
      break;
    case '2':
      eatGhost(ghosts[1])
      break;
    case '3':
      eatGhost(ghosts[2])
      break;
    case '4':
      eatGhost(ghosts[3])
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
