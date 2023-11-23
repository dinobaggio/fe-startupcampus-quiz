
export default async function (err, router) {
    const { status } = err.response
    if (status === 401 ) {
        localStorage.removeItem('token')
        router.push('/login')
    } else {
        alert(err)
    }
}