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



const cherry = {
  name: 'Cherry',
  points: 100
}

const strawberry = {
  name: 'Strawberry',
  points: 300
}

const orange = {
  name: 'Orange',
  points: 500
}

const apple = {
  name: 'Apple',
  points: 700
}

const pineapple = {
  name: 'Pineapple',
  points: 1000
}

const galaxianSpaceship = {
  name: 'Galaxian Spaceship',
  points: 2000
}

const bell = {
  name: 'Bell',
  points: 3000
}

const key = {
  name: 'Key',
  points: 5000
}

const fruits = [cherry, strawberry, orange, apple, pineapple, galaxianSpaceship, bell, key];



// Setup initial game stats
let level = 1;
let score = 0;
let lives = 2;
let powerPellets = 4;
let dots = 240;
let fruitBonus = false;
let currentFruit = fruits[0];



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
  console.log(`Level: ${level}`);
  console.log(`Score: ${score}     Lives: ${lives}\n`);
  console.log(`Power-Pellets: ${powerPellets}`);
  console.log(`Dots: ${dots}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');

  if (fruitBonus) {
    console.log(`(f) Eat ${currentFruit.name}`);
  }

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

  ghosts.forEach(function (ghost) { 
    if (ghost['edible']) {
      currentState = 'edible';
    } else {
      currentState = 'inedible';
    }

    console.log(`(${ghost['menu_option']}) Eat ${ghost['name']} (${currentState})`); //(1) Eat Blinky (edible)

  })
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatFruit() {
  console.log(`\nYou ate a ${currentFruit.name}!`);
  score += currentFruit.points;
}




function eatDot(numToEat) {
  dots -= numToEat;
  score += 10 * numToEat;
  console.log('\nChomp!');
  checkLevel(); //Checks if Pac-Man gains a level.
}


function eatPowerPellet() {
  score += 50;

  ghosts.forEach(function (ghost) {
    ghost['edible'] = true;
  })

  powerPellets -= 1
  console.log('\nEating a Power-Pellet!');
  checkLevel(); //Checks if Pac-Man gains a level.
}


function eatGhost(ghost) {
  if (ghost['edible']) {  //If selected ghost is edible, Pac-Man eats ghost.
    console.log(`\nPac-Man ate ${ghost['name']}!`);
    score += 200;
    ghost['edible'] = false;
  } else {  //Else selected ghost is not edible, Pac-Man loses a life.
    lives -= 1;
    console.log(`\n${ghost['name']} killed Pac-Man!`);
  }
}


function checkLevel() {
  if ((powerPellets == 0) && (dots == 0)) {
    level += 1;

    if (level == 2) { // Is there a cleaner way to write this?
      currentFruit = fruits[1];
    } else if (level == 3) {
      currentFruit = fruits[2];
    } else if (level == 5) {
      currentFruit = fruits[3];
    } else if (level == 7) {
      currentFruit = fruits[4];
    } else if (level == 9) {
      currentFruit = fruits[5];
    } else if (level == 11) {
      currentFruit = fruits[6];
    } else if (level == 13) {
      currentFruit = fruits[7];
    }

    // powerPellets = 4;
    // dots = 240;
    resetLevel();
    console.log('\nLevel Up!')

    // console.log(`Level: ${level}`);
    // console.log(`PowerPellets: ${powerPellets}`);
    // console.log(`Dots: ${dots}`);
  }

  if (level == 10) { //Change this to 256 later
    level = 1;
    score = 0;
    lives = 2;
    currentFruit = fruits[0];
    resetLevel();
    console.log('\n\nYou beat the game!\n');
  }
}


function resetLevel() {
  powerPellets = 4;
  dots = 240;

  ghosts.forEach((element) => {
    element['edible'] = false;
    console.log(`Edible: ${element['edible']}`);
  })

}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    
    

    case 'f':
      fruitBonus  
      ? eatFruit()  // If fruitBonus is true, trigger eatFruit().
      : console.log('\nNo Fruit on screen!')  // Else return message.
      break;


    case 'd':
      dots >= 1 
      ? eatDot(1)  // If dots >= 1, trigger eatDot().  Eats 1 dot.
      : console.log('\nNo Dots left!')  // Else return message.
      break;
    case 't':
      dots >= 10 
      ? eatDot(10)  // If dots >= 10, trigger eatDot().  Eats 10 dots.
      : console.log('\nNot enough Dots left!')  // Else return message.
      break;
    case 'o':
      dots >= 100 
      ? eatDot(100)  // If dots >= 100, trigger eatDot().  Eats 100 dots.
      : console.log('\nNot enough Dots left!')  // Else return message.
      break;
    case 'a':
      dots >= 1 
      ? eatDot(dots)  // If dots >= 1, trigger eatDot(). Eats all dots.
      : console.log('\nNo Dots left!')  // Else return message.
      break;
    case 'p':
      powerPellets >= 1 
      ? eatPowerPellet()  // If powerPellets >= 1, trigger eatPowerPellet().
      : console.log('\nNo Power-Pellets left!')  // Else return message.
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


    case 'r':  //Cheat code; remove this later.
      checkLevel();
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
