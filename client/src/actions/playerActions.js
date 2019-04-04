//GET RANDOM COLOR

export const getRandomColor = () => {
  function getRandomNumber(max = 1, min = 0) {
    return Math.floor(Math.random() * max + min);
  }

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

export const addPlayer = input => {
  let array = [];
  if (!isNaN(input)) {
    for (let i = 0; i < input && i < 10; i++) {
      array.push({
        id: i,
        name: `Player ${i + 1}`,
        color: getRandomColor(),
        textColor: "white",
        score: 0,
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
      });
    }
  }

  return {
    type: "ADD_PLAYER",
    players: array
  };
};

export const getKeyCode = keyCode => {
  switch (keyCode) {
    case 16:
      return 8679;
    default:
      return keyCode;
  }
};

export const shrinkLine = (players, id, amount) => {
  let array = players.map(player => {
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

export const changeProp = (players, id, type, prop = type) => {
  let array = players.map(player => {
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
