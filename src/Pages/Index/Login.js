// Libraries
import React, { Component } from 'react'
import { Grid, Icon, Form, Input, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { updateIndexScreen } from '../../Actions/IndexAction'
import { clearLoginErrors, updateLoginEmail, updateLoginPassword, validateLoginData } from '../../Actions/LoginAction'

// Utilities
import * as RequestUtility from '../../Utilities/RequestUtility'
import * as CookieUtility from '../../Utilities/CookieUtility'
import * as PromptUtility from '../../Utilities/PromptUtility'

function mapStateToProps(state) {
    return {
        global: state.global,
        login: state.login
    }
}

class Login extends Component {

    componentDidMount() {
        this.props.dispatch(clearLoginErrors())
    }

    render() {
        return (
            <div>
                <div className={(this.props.login.formErrors.length === 0) ? 'hide-content' : 'show-content'}>
                    <Message negative className='m-b-lg'>
                        <Message.List>
                            {
                                this.props.login.formErrors.map((error, index) => {
                                    return (
                                        <Message.Item key={index}>{error}</Message.Item>
                                    )
                                })
                            }
                        </Message.List>
                    </Message>
                </div>
                <Form className='m-b-lg'>
                    <Form.Field required>
                        <label>Email Address</label>
                        <Input id='emailAddress' type='text' icon='envelope' iconPosition='left' onChange={this.updateInputData}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Login Password</label>
                        <Input id='loginPassword' type='password' icon='key' iconPosition='left' onChange={this.updateInputData}/>
                    </Form.Field>
                </Form>
                <Grid className='m-a-0' columns={1} verticalAlign='middle'>
                    <Grid.Column className='p-a-0' width={16} textAlign='right'>
                        <Button size='mini' color='green' className='m-r-0' onClick={this.performUserLogin}>
                            <Icon name='sign in alternate'/>
                            Login
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    updateIndexScreen = (screen) => {
        this.props.dispatch(updateIndexScreen(screen))
    }

    updateInputData = (event, data) => {
        switch (data.id) {
            case 'emailAddress': {
                this.props.dispatch(updateLoginEmail(data.value))
                break
            }
            case 'loginPassword': {
                this.props.dispatch(updateLoginPassword(data.value))
                break
            }
            default: {
                break
            }
        }
    }

    performUserLogin = () => {
        this.props.dispatch(validateLoginData())
        setTimeout(() => {
            if (this.props.login.formErrors.length === 0) {
                RequestUtility.postRequest('/access/login', {
                    emailAddress: this.props.login.emailAddress,
                    loginPassword: this.props.login.loginPassword
                }).then((response) => {
                    if (response.statusCode === 200) {
                        CookieUtility.setCookie('session-token', response.headers['session-token'], { path: '/portal' })
                        window.location.href = this.props.global.webAppUrl + 'portal'
                    }
                    else {
                        document.getElementById('emailAddress').value = ''
                        document.getElementById('loginPassword').value = ''
                        this.props.dispatch(updateLoginEmail(''))
                        this.props.dispatch(updateLoginPassword(''))
                        switch (response.statusCode) {
                            case 400: {
                                PromptUtility.showPrompt({
                                    type: 'error',
                                    title: 'Bad Request!',
                                    content: 'The request was malformed.'
                                })
                                break
                            }
                            case 401: {
                                PromptUtility.showPrompt({
                                    type: 'error',
                                    title: 'Unauthorised!',
                                    content: 'Login Password is incorrect.'
                                })
                                break
                            }
                            case 404: {
                                PromptUtility.showPrompt({
                                    type: 'error',
                                    title: 'Not Found!',
                                    content: 'We haven\'t found your account.'
                                })
                                break
                            }
                            default: {
                                PromptUtility.showPrompt({
                                    type: 'error',
                                    title: 'Internal Server Error!',
                                    content: 'A unique error has occurred.'
                                })
                                break
                            }
                        }
                    }
                }).catch((error) => console.log(error))
            }
        }, 10)
    }

}

export default connect(mapStateToProps)(Login)