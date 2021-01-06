export function saveUserInfo(userInfo){
sessionStorage.setItem('user', userInfo);
}
export function setHeader(context){
context.isLoggedIn = sessionStorage.getItem('user') !== null 
context.user = sessionStorage.getItem('user'); 
// context.isLoggedIn = true; 
}