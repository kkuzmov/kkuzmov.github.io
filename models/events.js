export function create(data) {
    return firebase.firestore().collection('func').add(data)
}
export function getAll() {
    return firebase.firestore().collection('func').get()
}
export function get(id) {
    return firebase.firestore().collection('func').doc(id).get()
}
export function close(id) {
    return firebase.firestore().collection('func').doc(id).delete()
}
export function update(id, data) {
    return firebase.firestore().collection('func').doc(id).update(data)
}
