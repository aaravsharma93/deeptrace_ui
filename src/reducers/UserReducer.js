export const SET_USER = 'SET_USER';

export const setUser = user => {
    return {
        type: SET_USER,
        user
    };
};
export default function reducer(
    state = {
        user: {},
    },
    action
  ) {
    switch (action.type) {
      case SET_USER:
        return {
            ...state,
            user: action.user
        };
      default:
            break;
    }
    return state;
}