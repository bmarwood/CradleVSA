import Axios from "axios";

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type : LOADING_USER})
    Axios.post('/user',userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err));
}