import { newPlayer } from "../actions/playerActions";

const initState = {
  players: [newPlayer()]
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
