// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import '../App.css';
import RequestServer from './RequestServer';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';

class Location extends Component {

    constructor(props) {
        super(props)

        this.state = {
            locations: []
        }

        this.addLocation = this.addLocation.bind(this)
    }

    async componentDidMount() {
        var response = await RequestServer.getLocations()
        console.log("attempting to get response: ", response.data)
        this.setState({
            columns: [
                { title: 'id', field: 'id' },
                { title: 'Name', field: 'name' },
                { title: 'Address', field: 'address' },
            ],
            locations: response.data,           
        })
    }

    addLocation() {
        this.props.history.push(
            '/newlocation',
        )
    }

    render() {
        return (
            <div className='table-position'>
                <MaterialTable
                    title="Locations"
                    columns={this.state.columns}
                    data={this.state.locations}
                />
                <br/>
                <Button className="button-location" onClick={this.addLocation}>Add Location</Button>

            </div>
        );

    }

}


export default Location;
