// Libraries
import React, { Component } from 'react'
import { Menu, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { toggleLogoutModal } from '../../Actions/LogoutAction'

function mapStateToProps(state) {
    return {
        global: state.global
    }
}

class PortalHeader extends Component {

    render() {
        return (
            <Menu inverted fixed='top' size='mini' icon='labeled' color={this.props.global.themeColour}>
                <Menu.Item>
                    <Header textAlign='left' className='txt-white m-t-0'>
                        <Icon name='user secret'/>
                        <Header.Content>
                            Detective
                            <Header.Subheader>Code Analyser</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as='a' onClick={this.toggleLogoutModal}>
                        <Icon name='sign out alternate'/>
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }

    toggleLogoutModal = () => {
        this.props.dispatch(toggleLogoutModal())
    }

}

export default connect(mapStateToProps)(PortalHeader)