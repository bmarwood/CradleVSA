import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {editUserDetails} from '../redux/actions/userActions';

import { connect } from 'react-redux';
const styles = (theme) => ({
    ...theme
})

class EditDetails extends Component {
    state = {
        username: '',
        password: '',
        id: '',
        errorMsg: '',
        dob: '',
        address: '',
        gender: '',
        error: false,
        open: false
    };

    componentDidMount() {
        const {credentials} = this.props;
        this.setState({
            username: credentials.username ? credentials.username : '',
            dob: credentials.dob ? credentials.dob : '',
            gender: credentials.gender ? credentials.gender : '',
        })
    }

    render() {
        return (
            <div>
                <p> Hello World</p>
            </div>
        )
    }
}

EditDetails.PropTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails}(withStyles(style)(EditDetails)));