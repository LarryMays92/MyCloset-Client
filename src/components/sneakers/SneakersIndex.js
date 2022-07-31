import {
    useState,
    useEffect
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllPets } from '../../api/sneakers'
import messages from '../shared/AutoDismissAlert/messages'

// SneakersIndex should make a request to the api
// To get all sneakers
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const SneakersIndex = (props) => {
    const [sneakers, setSneakers] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in SneakersIndex', props)

    useEffect(() => {
        console.log(props)
        getAllSneakers()
            .then(res => setSneakers(res.data.sneakers))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Sneakers',
                    message: messages.getSneakersFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If sneakers haven't been loaded yet, show a loading message
    if (!sneakers) {
        return <LoadingScreen />
    } else if (sneakers.length === 0) {
        return <p>No sneakers yet. Better add some.</p>
    }

    const sneakerCards = sneakers.map(sneaker => (
        <Card style={{ width: '30%', margin: 5 }} key={sneaker.id}>
            <Card.Header>{sneaker.fullTitle}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/sneakers/${sneaker.id}`}>View {sneaker.brand}</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {sneakerCards}
        </div>
    )
}

export default SneakersIndex