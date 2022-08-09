import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneSneaker, updateSneaker, removeSneaker } from '../../api/sneakers'
import messages from '../shared/AutoDismissAlert/messages'
import EditSneakerModal from './EditSneakerModal'

// We need to get the sneaker's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const ShowSneaker = (props) => {
    const [sneaker, setSneaker] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the sneaker in showSneaker', sneaker)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneSneaker(id)
            .then(res => setSneaker(res.data.sneaker))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting sneaker',
                    message: messages.getSneakersFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the sneaker
    // this function's promise chain should send a message, and then go somewhere
    const removeTheSneaker = () => {
        removeSneaker(user, sneaker.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeSneakerSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing sneaker',
                    message: messages.removeSneakerFailure,
                    variant: 'danger'
                })
            })
    }

    if (!sneaker) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ sneaker.brand }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Brand: { sneaker.colorway }</small></div>
                            <div><small>Release: { sneaker.release }</small></div>
                            <div><small>
                                Deadstock: { sneaker.deadstock ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            sneaker.owner && user && sneaker.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Sneaker
                                </Button>
                                <Button onClick={() => removeTheSneaker()}
                                    className="m-2"
                                    variant="danger"
                                >
                            {sneaker.name} Were Sold Or Donated
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditSneakerModal 
                user={user}
                sneaker={sneaker} 
                show={editModalShow} 
                updateSneaker={updateSneaker}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )

}

export default ShowSneaker