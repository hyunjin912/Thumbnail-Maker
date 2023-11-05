const initialState = [];

export default function image(state = initialState, action) {
  switch (action.type) {
    case "ADD_IMAGES":
      return [...state, ...action.images];
    case "RESET_IMAGES":
      return [];
    default:
      return state;
  }
}
