//GET RANDOM COLOR

export const getRandomColor = () => {
  const getRandomNumber = (max = 1, min = 0) => {
    return Math.floor(Math.random() * max + min);
  };

  const isDuplicateIndex = (colorIndexes, currentIndex) => {
    for (let j = 0; j < colorIndexes.length; j++) {
      if (colorIndexes[j] === currentIndex) {
        return true;
      }
    }
    return false;
  };

  const combineColors = combinationColors => {
    let final = "#";
    let colorIndexes = [];
    for (let i = 0; i < combinationColors.length; i++) {
      let index = getRandomNumber(combinationColors.length);
      if (isDuplicateIndex(colorIndexes, index)) i--;
      else {
        colorIndexes.push(index);
        final += combinationColors[colorIndexes[i]];
      }
    }
    return final;
  };

  const randomNumLet = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];

  const randomComb = `${randomNumLet[getRandomNumber(randomNumLet.length)]}${
    randomNumLet[getRandomNumber(randomNumLet.length)]
  }`;

  const combinationColors = ["00", "ff", randomComb];

  return combineColors(combinationColors);
};

//---------------------------------------------------------

//ADDING PLAYERS

export const newPlayer = (i = 0) => {
  return {
    id: i,
    name: `Player ${i + 1}`,
    color: getRandomColor(),
    textColor: "white",
    score: 0,
    time: 10,
    keyCode: 65 + i,
    box: {
      height: 5,
      initTop: 0,
      top: 0,
      rotation: 0,
      dist: 1
    },
    line: { top: 20, height: 4 },
    speed: 0
  };
};

export const addPlayer = (input, max) => {
  let array = [];

  //if there is an input - add players in the array
  if (input > 0) {
    for (let i = 0; i < input && i < max; i++) {
      array.push(newPlayer(i));
    }
  } //if there is no input - add a single player to the array
  else {
    array.push(newPlayer());
  }

  return {
    type: "ADD_PLAYER",
    players: array
  };
};

//---------------------------------------------------------

//KEY SYMBOLS

export const getKeyCode = keyCode => {
  switch (keyCode) {
    case 16: //shift
      return 8679;
    case 13: //enter
      return 8629;
    case 9: //tab
      return 8646;
    case 32: //space
      return 9646;
    default:
      return keyCode;
  }
};

//----------------------------------------------------------

//LINE

export const shrinkLine = (players, id, amount) => {
  let array = players.map(player => {
    //if the id belongs to an player - decrease the line height and put the player back into the array with the new properties
    if (id === player.id) {
      player.line.height -= amount;
    }
    return player;
  });
  return {
    type: "SHRINK_LINE",
    players: array
  };
};

//----------------------------------------------------------

//CHANGE PROPERTY

export const changeProp = (players, id, type, prop = type) => {
  let array = players.map(player => {
    //if the id belongs to an player - change the property and put the player back into the array with the new properties
    if (id === player.id) {
      player[prop] = type;
    }
    return player;
  });
  return {
    type: "CHANGE_KEY",
    players: array
  };
};

//----------------------------------------------------------
