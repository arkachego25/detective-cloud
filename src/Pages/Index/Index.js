// Libraries
import React, { Component } from 'react'
import { Grid, Header, Icon, Divider, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { updateIndexScreen } from '../../Actions/IndexAction'

// Screens
import Login from './Login'
import Register from './Register'

function mapStateToProps(state) {
    return {
        global: state.global,
        index: state.index
    }
}

class Index extends Component {

    render() {
        return (
            <Grid className='full-height m-a-0' columns={3} verticalAlign='middle'>
                <Grid.Column className='p-a-0' width={6}></Grid.Column>
                <Grid.Column className='p-a-0' width={4}>
                    <Header icon textAlign='center' className='m-b-0'>
                        <Icon name='user secret'/>
                        <Header.Content>
                            Detective
                            <Header.Subheader>An Open-Source Code Analyser</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Divider className='m-y-lg'/>
                    <div className='p-x-md'>{this.renderScreen()}</div>
                    <Divider className='m-y-lg'/>
                    <Grid className='m-a-0' columns={1}>
                        <Grid.Column className='p-a-0' width={16} textAlign='center'>{this.renderFooter()}</Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column className='p-a-0' width={6}></Grid.Column>
            </Grid>
        )
    }

    renderScreen = () => {
        switch (this.props.index.activeScreen) {
            case 'Login': { return (<Login/>) }
            case 'Register': { return (<Register/>) }
            default: return (<div></div>)
        }
    }

    renderFooter = () => {
        if (this.props.index.activeScreen === 'Register') {
            return (
                <Label basic color={this.props.global.themeColour}>
                    Aleady have an Account? <a style={{ cursor: 'pointer' }} onClick={() => this.updateIndexScreen('Login')}>Login</a> now!
                </Label>
            )
        }
        else {
            return (
                <Label basic color={this.props.global.themeColour}>
                    Don't have an Account yet? <a style={{ cursor: 'pointer' }} onClick={() => this.updateIndexScreen('Register')}>Register</a> now!
                </Label>
            )
        }
    }

    updateIndexScreen = (screen) => {
        this.props.dispatch(updateIndexScreen(screen))
    }

}

export default connect(mapStateToProps)(Index)