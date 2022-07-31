import { useState, useEffect } from "react"
import { getOneSneaker } from "../../api/sneakers"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card } from "react-bootstrap"

//useParams this will allow us to see our parameters
//useNavigate this will allow us navigate to a specific page

import LoadingScreen from "../shared/LoadingScreen"
import messages from '../shared/AutoDismissAlert/messages'

//We need to get the pet's id from the parameters
//Then we need to make a request to the api
//Then we need to display the results in this component
const ShowSneaker = (props) => {
    const [sneaker, setSneaker] = useState(null)
    const { id } = useParams()
    // ^^deconstructuring to get the id value from our route parameters
    const navigate = useNavigate()
    const { msgAlert } = props

    useEffect(() => {
        getOneSneaker(id)
            .then(res => setSneaker(res.data.sneaker))
            .catch(err => {
               msgAlert({heading: 'Error Getting Sneakers',
                message: messages.getSneakersFailure,
                   variant: 'danger',
               })
                navigate('/')
                //navigate back to the homepage if there's an error
            })
    }, [])
    
    if (!sneaker) {
        return<LoadingScreen/>
    }
    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{sneaker.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Release:{sneaker.release}</small></div>
                        <div><small>Colorway:{sneaker.type}</small></div>
                        <div><small>Deadstock:{sneaker.deadstock ? 'yes' : 'no'}</small></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default ShowSneaker

