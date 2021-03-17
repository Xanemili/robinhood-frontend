import { LOAD_PORTFOLIO_HISTORY} from '../actionTypes'

const portfolioChartReducer = (state = [], action) => {
  switch(action.type){
    case LOAD_PORTFOLIO_HISTORY:
      return action.payload
    default:
      return state
  }
}

export default portfolioChartReducer