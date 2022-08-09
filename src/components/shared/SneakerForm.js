import { Form, Button, Container } from 'react-bootstrap'

const SneakerForm = (props) => {
    const { sneaker, handleChange, heading, handleSubmit } = props 
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
        
                <Form.Label htmlFor="brand">Brand</Form.Label>
                <Form.Control
                    placeholder="What brand is your sneaker?"
                    name="brand"
                    id="brand"
                    value={ sneaker.brand }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="release">Release</Form.Label>
                <Form.Control
                    placeholder="What Year Were They Released?"
                    type = "number"
                    name="release"
                    id="release"
                    value={ sneaker.release }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="color">Colorway</Form.Label>
                <Form.Control
                    placeholder="Colorway"
                    name="color"
                    id="color"
                    value={ sneaker.color }
                    onChange={ handleChange }
                    />
                <Form.Check
                label ="Are These Deadstock"
                    placeholder="Are They Dead Stock"
                    name="deadstock"
                    defautChecked={ sneaker.deadstock }
                    onChange={ handleChange }
                    />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default SneakerForm