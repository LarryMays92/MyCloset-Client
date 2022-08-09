import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/SneakerForm'
import { updateSneakerSuccess, updateSneakerFailure } from '../shared/AutoDismissAlert/messages'

const EditSneakerModal = (props) => {
    const { 
        user, show, handleClose, 
        updateSneaker, msgAlert, triggerRefresh
    } = props

    const [sneaker, setSneaker] = useState(props.sneaker)

    console.log('sneaker in edit modal', sneaker)

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

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateSneaker(user, sneaker)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateSneakerSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showSneakercomponent
            // updated is in ShowSneaker's useEffect's dependency array
            // changes to the updated boolean cause ShowSneaker's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateSneakerFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SneakerForm 
                    sneaker={sneaker}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Sneaker"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSneakerModal