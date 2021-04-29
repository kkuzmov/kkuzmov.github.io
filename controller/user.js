import commonPartials from './partials.js';
import { login,logout,registerUser } from '../models/user.js';
import { saveUserInfo, setHeader } from './auth.js';
import { get } from '../models/events.js';
import { notify, timeout } from './func.js';

export function getLogin(context) {
    setHeader(context);
    context.loadPartials(commonPartials).partial('../templates/user/login.hbs');
}
export function getRegister(context) {
    setHeader(context);
    context.loadPartials(commonPartials).partial('../templates/user/register.hbs');
}
export function postRegister(context) {
    const {firstName, lastName, username,  password, repeatPassword } = context.params;
    if (password !== repeatPassword) {
        // NOTIFICATION!
    }
    const names = `${firstName} ${lastName}`;
    registerUser(username, password)
        .then(res => {
            notify('User registration successful.', 'successBox');
            saveUserInfo(names); 
            firebase.auth().currentUser.updateProfile({
                displayName: names
            })
            timeout(this, 'home')
        })
        .catch(e => {
            notify(e.message, 'errorBox')
            let errBx = document.getElementById('errorBox');
            errBx.addEventListener('click', function(e){errBx.style.display = 'none'});
        })
}
export function postLogin(context) {
    const {username,password} = context.params;
    
    login(username, password)
        .then(res=>{
            let currUser = res.user.displayName;
            saveUserInfo(currUser);
            notify('Login successful.', 'successBox')
            timeout(this, 'home')
        })
        .catch(e => {
            notify(e.message, 'errorBox')
            let errBx = document.getElementById('errorBox');
            errBx.addEventListener('click', function(e){errBx.style.display = 'none'});
        })

}
export function getLogout() {
    logout()
        .then(res => {
            sessionStorage.clear();
            notify('Logout successful.', 'successBox');
            timeout(this, 'home');
        })
}
