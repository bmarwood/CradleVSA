// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import '../App.css';
import RequestServer from './RequestServer';
import MaterialTable from 'material-table';

class Location extends Component {

    constructor(props) {
        super(props)

        this.state = {
            locations: []
        }
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

    displayLocations() {
        var locations = []
        if (this.state.locations.length != 0) {
            this.state.locations.forEach(location => {
                console.log('location: ', location)
                locations.push(<p style={{color: "white"}}>{location.name}</p>)
            })
            return locations
        }
    }


    render() {
        return (
            <div className='table-position'>
                <MaterialTable
                    title="Locations"
                    columns={this.state.columns}
                    data={this.state.locations}
                />
                
            </div>
        );

    }

}


export default Location;
