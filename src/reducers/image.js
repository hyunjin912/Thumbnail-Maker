const initialState = {
  search: "",
  page: 1,
  data: [],
  total_pages: null,
};

export default function image(state = initialState, action) {
  switch (action.type) {
    case "ADD_IMAGES":
      return {
        search: action.search,
        page: action.page,
        data: [...action.images],
        total_pages: action.total_pages,
      };
    case "UPDATE_IMAGES":
      return {
        search: state.search,
        page: action.page,
        data: [...state.data, ...action.images],
        total_pages: action.total_pages,
      };
    case "RESET_IMAGES":
      return {
        search: "",
        page: 1,
        data: [],
        total_pages: null,
      };
    default:
      return state;
  }
}
