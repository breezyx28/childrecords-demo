// reducers/progressReducer.ts

// Define the types of actions for the reducer
export type Action =
  | { type: "SELECT_ITEM"; payload: { id: string; totalItems: number } }
  | { type: "DESELECT_ITEM"; payload: { id: string; totalItems: number } };

// Define the state type
export interface MotorProgressState {
  motors: {
    [id: string]: {
      selectedCount: number;
      totalItems: number;
    };
  };
}

// Define the initial state
export const initialState: MotorProgressState = {
  motors: {},
};

// Reducer function to handle actions
export function motorReducer(
  state: MotorProgressState,
  action: Action
): MotorProgressState {
  const { id, totalItems } = action.payload;
  const motor = state.motors[id] || { selectedCount: 0, totalItems };

  switch (action.type) {
    case "SELECT_ITEM":
      return {
        ...state,
        motors: {
          ...state.motors,
          [id]: {
            ...motor,
            selectedCount: motor.selectedCount + 1,
          },
        },
      };
    case "DESELECT_ITEM":
      return {
        ...state,
        motors: {
          ...state.motors,
          [id]: {
            ...motor,
            selectedCount: Math.max(0, motor.selectedCount - 1),
          },
        },
      };
    default:
      throw new Error(`Unknown action type in motor reducer`);
  }
}
