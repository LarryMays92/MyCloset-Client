import SneakersIndex from "./sneakers/SneakersIndex"
const Home = (props) => {
    // const { msgAlert, user } = props
    console.log('props in home', props)
    const { msgAlert } = props
    return (
        <>
            <h2>Welcome To The Your Closet</h2>
            <SneakersIndex msgAlert={msgAlert} />
        </>
    )
}
export default Home