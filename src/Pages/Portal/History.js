// Libraries
import React, { Component } from 'react'
import { List, Segment, Header, Icon, Grid } from 'semantic-ui-react'
import Moment from 'react-moment'
import { connect } from 'react-redux'

// Actions
import { updateSnippetData } from '../../Actions/AnalyserAction'

function mapStateToProps(state) {
    return {
        global: state.global,
        analyser: state.analyser
    }
}

class History extends Component {

    state = {
        overflowY: 'auto',
        height: window.innerHeight - 138
    }

    render() {
        return (
            <div>
                <Header className='m-y-xs p-y-xs'>
                    <Icon name='hourglass half'/>
                    Snippet History
                </Header>
                <Segment style={this.state} className='p-a-0'>
                    <List divided relaxed>
                        {
                            this.props.analyser.snippetHistory.map((snippet, index) => {
                                return (
                                    <List.Item key={index} as='a' onClick={() => this.loadSnippetData(snippet)}
                                        className={(snippet.snippetId === this.props.analyser.snippetData.snippetId) ? 'bck-grey-25 p-x-md p-y-sm' : 'p-x-md p-y-sm'}>
                                        <List.Icon name='paper plane' size='large' verticalAlign='middle' color={this.props.global.themeColour}/>
                                        <List.Content>
                                            <Grid className='m-a-0' columns={2} verticalAlign='middle'>
                                                <Grid.Column className='p-a-0' width={14}>
                                                    <Header className='m-a-0' size='tiny'>
                                                        {snippet.snippetLanguage}
                                                        <Header.Subheader className='txt-grey'>
                                                            <Moment fromNow ago>{snippet.snippetStamp}</Moment> ago
                                                        </Header.Subheader>
                                                    </Header>
                                                </Grid.Column>
                                                <Grid.Column className='p-a-0' width={2} textAlign='right'>
                                                    <Icon size='large' color={(snippet.snippetId === this.props.analyser.snippetData.snippetId) ? 'green' : 'grey'}
                                                        name={(snippet.snippetId === this.props.analyser.snippetData.snippetId) ? 'eye' : 'eye slash'}/>
                                                </Grid.Column>
                                            </Grid>
                                        </List.Content>
                                    </List.Item>
                                )
                            })
                        }
                    </List>
                </Segment>
            </div>
            
        )
    }

    loadSnippetData = (snippet) => {
        this.props.dispatch(updateSnippetData(snippet))
    }

}

export default connect(mapStateToProps)(History)