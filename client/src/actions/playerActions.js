export const addPlayer = input => {
  let players = [];
  if (!isNaN(input)) {
    for (let i = 0; i < input; i++) {
      let firstRandom = Math.floor(Math.random() * 89 + 10);
      let text = "white";
      //   if (firstRandom <= 90) text = "white";
      let randomColor =
        "#" + firstRandom + Math.floor(Math.random() * 8999 + 1000);
      players.push({
        id: i,
        name: `Player ${i + 1}`,
        color: randomColor,
        textColor: text,
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
    players
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

export const changeKeyCode = (players, id, keyCode) => {
  players.find(player => {
    if (id === player.id) {
      player.keyCode = keyCode;
    }
  });
  return {
    type: "CHANGE_KEY",
    players
  };
};
