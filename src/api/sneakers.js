import apiUrl from '../apiConfig'
import axios from 'axios'
export const getAllSneakers = () => {
    return axios(`${apiUrl}/pets`)
}
export const getOneSneaker = (id) => {
    return axios(`${apiUrl}/sneakers/${id}`)
}

export const createSneaker = (user, newSneaker) => {
    // console.log('createShoe in api was hit')
    // console.log('this is user', user)
    // console.log('this is newShoe', newShoe)
    return axios({
		url: apiUrl + '/sneakers',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { sneaker:  newSneaker },
	})
}

// UPDATE
export const updateSneaker = (user, updatedSneaker) => {
    // in our createsneakerform, we're building an object
    // when we pass that object into the api createSneaker function,
    // it's going to look like the sneaker in our database
    // we're going to refer to this as newSneaker
    // console.log('this is user', user)
    console.log('this is updatedSneaker', updatedSneaker)
	return axios({
		url: `${apiUrl}/sneakers/${updatedSneaker.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { shoe: updatedSneaker }
	})
}  

// DELETE
export const removeSneaker = (user, sneakerId) => {
    return axios({
        url: `${apiUrl}/sneakers/${sneakerId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
} 