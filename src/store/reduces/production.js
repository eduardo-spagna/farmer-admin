export const TYPES = {
  selectProduction: '[production] select Production',
  removeSelectedProduction: '[production] remove selected Production',
};

const initialState = {
  selectedItem: null,
};

const reduce = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.selectProduction:
      return { ...state, selectedItem: action.payload };
    case TYPES.removeSelectedProduction:
      return { ...state, selectedItem: null };

    default:
      return state;
  }
};

export const selectProduction = (selectedItem) => ({
  type: TYPES.selectProduction,
  payload: selectedItem,
});

export const removeSelectedProduction = () => ({
  type: TYPES.removeSelectedProduction,
});

export default reduce;
