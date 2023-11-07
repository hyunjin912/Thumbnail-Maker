const initialState = {
  search: "",
  page: 1,
  data: [],
};

export default function image(state = initialState, action) {
  switch (action.type) {
    case "ADD_IMAGES":
      return {
        search: action.search,
        page: 1,
        data: [...action.images],
      };
    case "UPDATE_IMAGES":
      return {
        search: state.search,
        page: action.page,
        data: [...state.data, ...action.images],
      };
    case "RESET_IMAGES":
      return {
        search: "",
        page: 1,
        data: [],
      };
    default:
      return state;
  }
}
