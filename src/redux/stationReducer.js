const initialState = {
    list: [],
    show_chart_of: 0
}

const stationReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'SET_LIST':
            return {
                ...state,
                list: action.value
            }
        case 'ADD_STATION':
            return {
                ...state,
                list: [...state.list, action.value],
            }
        case 'HIDE_STATION':
            return {
                ...state,
                list: state.list.map(station=>{
                    return station.id === action.value
                    ? {...station, visible: false}
                    : station
                }
                )
            }
        case 'SHOW_CHART':
            return {
                ...state,
                show_chart_of: action.value
            }
        case 'HIDE_CHART':
            return {
                ...state,
                show_chart_of: null
            }
        default:
            return state
    }
}

export default stationReducer