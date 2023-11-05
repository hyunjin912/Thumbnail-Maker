const initialState = 3;

export default function column(state = initialState, action) {
  switch (action.type) {
    case "SET_COLUMN":
      return action.column;
    default:
      return state;
  }
}
