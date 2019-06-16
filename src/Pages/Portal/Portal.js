// Libraries
import React, { Component } from 'react'
import { Modal, Button, Icon, Grid, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { toggleLogoutModal } from '../../Actions/LogoutAction'

// Sections
import PortalHeader from './Header'
import PortalContent from './Content'

// Utilities
import * as RequestUtility from '../../Utilities/RequestUtility'
import * as CookieUtility from '../../Utilities/CookieUtility'

function mapStateToProps(state) {
    return {
        global: state.global,
        logout: state.logout
    }
}

class Portal extends Component {

    render() {
        return this.renderPortal()
    }

    renderPortal = () => {
        if (CookieUtility.getCookie('session-token', { path: '/portal' }) === undefined) {
            return (
                <Grid className='full-height m-a-0' verticalAlign='middle' columns={3}>
                    <Grid.Column className='p-a-0' width={6}></Grid.Column>
                    <Grid.Column className='p-a-0' width={4}>
                        <Segment placeholder className='bdr-red'>
                            <Header icon color='red'>
                                <Icon name='ban'/>
                                <Header.Content>
                                    No Session Token
                                    <Header.Subheader>You are not authorised to view this page.</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className='p-a-0' width={6}></Grid.Column>
                </Grid>
            )
        }
        else {
            return (
                <div className='full-height'>
                    <PortalHeader/>
                    <PortalContent/>
                    <Modal size='mini' open={this.props.logout.modalVisible} onClose={this.toggleLogoutModal} closeOnEscape={false} closeOnDimmerClick={false}>
                        <Modal.Header className={'bck-' + this.props.global.themeColour + ' txt-white'}>
                            <b>Logout Confirmation</b>
                        </Modal.Header>
                        <Modal.Content>Do you really like to logout from the facility?</Modal.Content>
                        <Modal.Actions>
                            <Button size='mini' color='red' onClick={this.toggleLogoutModal}>
                                <Icon name='times'/>
                                No
                            </Button>
                            <Button size='mini' color='green' onClick={this.performUserLogout}>
                                <Icon name='check'/>
                                Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            )
        }
    }

    toggleLogoutModal = () => {
        this.props.dispatch(toggleLogoutModal())
    }

    performUserLogout = () => {
        if (this.props.logout.modalVisible) {
            this.props.dispatch(toggleLogoutModal())
        }
        RequestUtility.headRequest('/access/logout').then(() => {
            CookieUtility.deleteCookie('session-token', { path: '/portal' })
            window.location.href = this.props.global.webAppUrl
        }).catch ((error) => console.log(error))
    }

}

export default connect(mapStateToProps)(Portal)