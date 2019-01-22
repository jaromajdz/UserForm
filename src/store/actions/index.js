import a1 from './authActions'
import a2 from './singUpActions'

const actionTypes = {...a1, ...a2};

console.log('Action', actionTypes)

export default actionTypes;
