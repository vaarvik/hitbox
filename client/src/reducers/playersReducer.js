const initState = {
  players: [
    {
      id: 0,
      name: `Player 1`,
      color:
        "#" +
        Math.floor(Math.random() * 89 + 10) +
        Math.floor(Math.random() * 8999 + 1000),
      textColor: "white",
      score: 0,
      keyCode: 87,
      box: {
        height: 5,
        initTop: 0,
        top: 0,
        rotation: 0,
        dist: 1
      },
      line: { top: 20, height: 4 },
      speed: 0
    }
  ]
};

const playersReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return {
        ...state,
        players: action.players
      };
    case "CHANGE_KEY":
      return {
        ...state,
        players: action.players
      };
    case "SHRINK_LINE":
      return {
        ...state,
        players: action.players
      };
    default:
      return state;
  }
};

export default playersReducer;
