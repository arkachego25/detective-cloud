// Libraries
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { updateSnippetHistory } from '../../Actions/AnalyserAction'

// Analyser
import History from './History'
import Analyser from './Analyser'

// Utilities
import * as RequestUtility from '../../Utilities/RequestUtility'

function mapStateToProps(state) {
    return {
        global: state.global
    }
}

class Content extends Component {

    componentDidMount() {
        RequestUtility.getRequest('/snippet').then((response) => {
            this.props.dispatch(updateSnippetHistory(JSON.parse(response.body).snippetsList))
        }).catch((error) => console.log(error))
    }

    render() {
        return (
            <Grid divided className='full-height m-a-0' style={{ paddingTop: 57.250 }}columns={2}>
                <Grid.Column width={4} className='p-a-md'>
                    <History/>
                </Grid.Column>
                <Grid.Column width={12} className='p-a-md'>
                    <Analyser/>
                </Grid.Column>
            </Grid>
        )
    }

}

export default connect(mapStateToProps)(Content)