import { useState } from 'react'
import { createPet } from '../../api/sneakers'
import { useNavigate } from 'react-router-dom'
import { createSneakerSuccess, createSneakerFailure } from '../shared/AutoDismissAlert/messages'
import SneakerForm from '../shared/SneakerForm'

const CreateSneaker = (props) => {
    console.log('these are the props in createSneaker\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [sneaker, setSneaker] = useState({
        name: '',
        colorway: '',
        release: '',
        deadstock: false
    })

    console.log('this is sneaker in createSneaker', sneaker)

    const handleChange = (e) => {
        setSneaker(prevSneaker => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "deadstock" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "deadstock" && !e.target.checked) {
                updatedValue = false
            }

            const updatedSneaker = {
                [updatedName]: updatedValue
            }
            return {
                ...prevSneaker,
                ...updatedSneaker
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createSneaker(user, sneaker)
            // if we're successful, navigate to the show page for the new sneaker
            .then(res => { navigate(`/sneakers/${res.data.sneaker.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createSneakerSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createSneakerFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <PetForm 
            sneaker={ sneaker } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new sneaker!"
        />
    )
}

export default CreateSneaker