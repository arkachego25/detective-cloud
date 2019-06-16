// Libraries
import React, { Component } from 'react'
import { Grid, Icon, Form, Input, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { updateIndexScreen } from '../../Actions/IndexAction'
import { clearRegisterErrors, updateRegisterEmail, updateRegisterPassword,
    updateRegisterRetype, validateRegisterData } from '../../Actions/RegisterAction'

// Utilities
import * as RequestUtility from '../../Utilities/RequestUtility'
import * as PromptUtility from '../../Utilities/PromptUtility'

function mapStateToProps(state) {
    return {
        global: state.global,
        register: state.register
    }
}

class Register extends Component {

    componentDidMount() {
        this.props.dispatch(clearRegisterErrors())
    }

    render() {
        return (
            <div>
                <div className={(this.props.register.formErrors.length === 0) ? 'hide-content' : 'show-content'}>
                    <Message negative className='m-b-lg' size='mini'>
                        <Message.List>
                            {
                                this.props.register.formErrors.map((error, index) => {
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
                    <Form.Field required>
                        <label>Retype Password</label>
                        <Input id='retypePassword' type='password' icon='redo alternate' iconPosition='left' onChange={this.updateInputData}/>
                    </Form.Field>
                </Form>
                <Grid className='m-a-0' columns={1} verticalAlign='middle'>
                    <Grid.Column className='p-a-0' width={16} textAlign='right'>
                        <Button size='mini' color='green' className='m-r-0' onClick={this.performUserRegister}>
                            <Icon name='edit'/>
                            Register
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    updateInputData = (event, data) => {
        switch (data.id) {
            case 'emailAddress': {
                this.props.dispatch(updateRegisterEmail(data.value))
                break
            }
            case 'loginPassword': {
                this.props.dispatch(updateRegisterPassword(data.value))
                break
            }
            case 'retypePassword': {
                this.props.dispatch(updateRegisterRetype(data.value))
                break
            }
            default: {
                break
            }
        }
    }

    performUserRegister = () => {
        this.props.dispatch(validateRegisterData())
        setTimeout(() => {
            if (this.props.register.formErrors.length === 0) {
                RequestUtility.postRequest('/access/register', {
                    emailAddress: this.props.register.emailAddress,
                    loginPassword: this.props.register.loginPassword
                }).then((response) => {
                    if (response.statusCode === 201) {
                        PromptUtility.showPrompt({
                            type: 'success',
                            title: 'Success!',
                            content: 'Account has been created.'
                        })
                        this.props.dispatch(updateIndexScreen('Login'))
                    }
                    else {
                        document.getElementById('emailAddress').value = ''
                        document.getElementById('loginPassword').value = ''
                        document.getElementById('retypePassword').value = ''
                        this.props.dispatch(updateRegisterEmail(''))
                        this.props.dispatch(updateRegisterPassword(''))
                        this.props.dispatch(updateRegisterRetype(''))
                        switch (response.statusCode) {
                            case 400: {
                                PromptUtility.showPrompt({
                                    type: 'error',
                                    title: 'Bad Request!',
                                    content: 'The request was malformed.'
                                })
                                break
                            }
                            case 409: {
                                PromptUtility.showPrompt({
                                    type: 'error',
                                    title: 'Conflict!',
                                    content: 'The account already exists.'
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

export default connect(mapStateToProps)(Register)