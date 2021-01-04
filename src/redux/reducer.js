const initialState = {
  lists: [],
  loading: false
};

export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOADING": {
      let newState = state;
      newState.loading = action.payload;
      return { ...newState };
    }
    case "ADD_LIST": {
      return { lists: [{ name: action.payload, items: [] }, ...state.lists] };
    }
    case "DEL_LIST": {
      let listIndex = state.lists.findIndex(
        (list) => list.name === action.payload
      );
      let beforeLists = state.lists.slice(0, listIndex);
      let afterLists = state.lists.slice(listIndex + 1, state.lists.length);

      return { lists: [...beforeLists, ...afterLists] };
    }
    case "ADD_ITEM": {
      let list = state.lists.findIndex(
        (list) => list.name === action.payload.currentList
      );
      let prevItems = state.lists[list].items;
      let newItems = [action.payload.itemText, ...prevItems];
      let newList = { name: state.lists[list].name, items: newItems };
      let newLists = [...state.lists];
      newLists[list] = newList;

      return { lists: [...newLists] };
    }
    case "DEL_ITEM": {
      let listIndex = state.lists.findIndex(
        (list) => list.name === action.payload.currentList
      );

      let itemIndex = state.lists[listIndex].items.indexOf(
        action.payload.currentItem
      );

      let beforeItems = state.lists[listIndex].items.slice(0, itemIndex);
      let afterItems = state.lists[listIndex].items.slice(
        itemIndex + 1,
        state.lists[listIndex].items.length
      );
      let newList = {
        name: state.lists[listIndex].name,
        items: [...beforeItems, ...afterItems]
      };
      let newLists = [...state.lists];
      newLists[listIndex] = newList;

      return { lists: [...newLists] };
    }
    default:
      return state;
  }
};
