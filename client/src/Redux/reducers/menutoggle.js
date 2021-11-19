let initialState = false;

const toggleMenu = (state = initialState, action) => {
    switch(action.type){
        case "SHOWLOGIN": return state = false;
        case "SHOWLOGOUT": return state = true;
        default: return state;
    }
}

export default toggleMenu;