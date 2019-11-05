import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';
import "react-datepicker/dist/react-datepicker.css";
import './newForm.css';

class NewLocation extends React.Component {

    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            address: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      
    }

    //handle input change
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async () => {
        var response = await RequestServer.addLocation(this.state)
        if (response !== null) {
            this.props.history.push(
                '/location',
                {detail: response.data}
            )
        }
    }


    render() {
        return (
            <ValidatorForm
                style={{
                    backgroundColor: 'white',
                    margin: '100px',
                    padding: '50px',
                    textAlign: 'center'
                }}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <h4>New Location </h4>
                <TextValidator
                    label="Name"
                    onChange={this.handleChange}
                    name="name"
                    value={this.state.name}
                    validators={['required', 'matchRegexp:^[a-zA-Z0-9_." *"]*$']}
                    errorMessages={['this field is required', 'Invalid input ']}
                    variant="outlined"
                />
                <br/>
                <br/>
                <TextValidator
                    label="Address"
                    onChange={this.handleChange}
                    name="address"
                    value={this.state.address}
                    validators={['required', 'matchRegexp:^[a-zA-Z0-9_." *"]*$']}
                    errorMessages={['this field is required', 'Invalid input ']}
                    variant="outlined"
                />
                <br/>
                <br/>
                <Button type="submit" style={{
                    backgroundColor: 'blue',
                    color: 'white'
                }}>Submit</Button>
                <br/>
                <br/>
            </ValidatorForm>
        );
    }
}

export default NewLocation
