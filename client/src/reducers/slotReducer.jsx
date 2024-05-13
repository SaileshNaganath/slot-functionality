import { 
    GET_SLOTS, 
    GET_SUMMARY,
    ADD_SLOT_DATE,
    ADD_TIME_SLOT, 
    DELETE_SLOT, 
    DELETE_TIME_SLOT, 
    SLOTS_LOADING, 
    SLOTS_REQUEST,
    GET_SLOT_BY_DATE,
    UPDATE_SLOT,
} from '../actions/types';

const initialState ={
    slots:[],
    loading:true
}

export const slotActionReducer = ( state = initialState , action) => {
    let selectedElementIndex, updatedSlots,updateSlot,slotIndex;
    switch(action.type){

        case SLOTS_LOADING:
            return{
                ...state,
                loading: true
            };
            case SLOTS_REQUEST:
                return{
                    slots:[],
                    loading: true
                };
        case GET_SLOTS:
            return{
                ...state,
                slots: action.payload,
                loading: false
            };
        case GET_SUMMARY:
            return{
                ...state,
                slots: [action.payload],
                loading: false
            };
        case GET_SLOT_BY_DATE:
            return{
                ...state,
                slots: [action.payload],
                loading: false
            };
        case ADD_SLOT_DATE:
                return{
                    ...state,
                    slots: [action.payload, ...state.slots],
                    loading: false
                };
        case ADD_TIME_SLOT:
                    return{
                        ...state,
                        slots: [action.payload],
                        loading: false
                    };
        case DELETE_SLOT:
                return{
                    ...state,
                    slots: state.slots.filter(slot => slot._id!==action.payload),
                    loading: false                
                };
        case DELETE_TIME_SLOT:
                    // Determine the index of the selected element
                    selectedElementIndex = state.slots.findIndex(slot => slot._id === action.payload);
                    
                    // Make a copy of state.slots
                    updatedSlots = [...state.slots];
                    
                    // Check if the selected element is found
                    if (selectedElementIndex !== -1) {
                        // Filter the timeSlots of the selected element
                        updatedSlots[selectedElementIndex].timeSlots = updatedSlots[selectedElementIndex].timeSlots.filter(slot => slot._id === action.payload);
                    }
                return{
                    ...state,
                    slots: updatedSlots,
                    loading: false                
                };
        case UPDATE_SLOT:
                return{
                    ...state,
                    slots: [action.payload],
                    loading: false
                };

        default:
            return state;

        }
        
    }


