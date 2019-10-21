import '../App.css';

function Logout(props) {


    const logout = () => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            localStorage.setItem("isLoggedIn", "false")
            localStorage.setItem("userData", JSON.stringify("{}"))
            var user = localStorage.getItem("userData")
            console.log(user)
            props.history.push('/')
            window.location.reload()
        } else {
            props.history.push('/')
            window.location.reload()
        }
    }
    
    return (
        logout()
    );
}


export default Logout;