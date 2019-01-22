export const updateObject = (oldObject, updateValues)=>{
      return { ...oldObject,
              ...updateValues
      };

};

export const copy_state = (state) =>{
  let copy = {}
  for(let key in state){
    if(typeof(state[key])=== 'Object'){
      copy[key]=copy_state(state[key])
    }else{
      copy[key] = state[key]
    }
  }
   return copy
}
