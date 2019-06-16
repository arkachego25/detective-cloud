// Libraries
import React, { Component } from 'react'
import { Grid, Form, Dropdown, Button, Icon, TextArea, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

// Actions
import { updateSupportedLanguages, updateSnippetHistory, updateSnippetContent, updateSnippetLanguage,
    updateSnippetData, clearSnippetData } from '../../Actions/AnalyserAction'

// Utilities
import * as RequestUtility from '../../Utilities/RequestUtility'
import * as PromptUtility from '../../Utilities/PromptUtility'

function mapStateToProps(state) {
    return {
        global: state.global,
        analyser: state.analyser
    }
}

class Analyser extends Component {

    state = {
        resize: 'none',
        fontFamily: '"Courier New", Courier, monospace',
        height: window.innerHeight - 138
    }

    componentDidMount() {
        document.getElementById('fileUploader').addEventListener('change', (event) => {
            this.processAnalyserFile(event.target.files[0])
        }, false)
        RequestUtility.getRequest('/language').then((response) => {
            let languagesList = JSON.parse(response.body).languagesList
            for (let i = 0; i < languagesList.length; i++) {
                languagesList[i] = {
                    text: languagesList[i],
                    value: languagesList[i]
                }
            }
            this.props.dispatch(updateSupportedLanguages(languagesList))
            this.props.dispatch(updateSnippetLanguage(languagesList[0].value))
        }).catch((error) => console.log(error))
    }

    render() {
        return (
            <div className='full-height'>
                <Grid className='m-a-0' verticalAlign='middle'>
                    <Grid.Column width={2} className='p-l-0 p-r-sm p-y-0'>
                        <Button fluid color='teal' onClick={this.clearAnalyserForm}>
                            <Icon name='plus'/>
                            Add New
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={7} className='p-x-sm p-y-0'></Grid.Column>
                    <Grid.Column width={3} className='p-x-sm p-y-0'>
                        <Dropdown fluid selection options={this.props.analyser.languagesList}
                            value={this.props.analyser.snippetData.snippetLanguage} onChange={this.onLanguageChange}/>
                    </Grid.Column>
                    <Grid.Column width={2} className='p-x-sm p-y-0'>
                        <Button fluid color='orange' className='m-r-0' onClick={this.selectAnalyserFile}>
                            <Icon name='upload'/>
                            Browse
                        </Button>
                        <input type='file' id='fileUploader' hidden/>
                    </Grid.Column>
                    <Grid.Column width={2} className='p-l-sm p-r-0 p-y-0'>
                        <Button fluid color='green' className='m-r-0' onClick={this.performCodeAnalysis}>
                            <Icon name='paper plane'/>
                            Analyse
                        </Button>
                    </Grid.Column>
                </Grid>
                {this.renderEditor()}
            </div>
        )
    }

    renderEditor = () => {
        if (this.props.analyser.snippetData.snippetErrors.length === 0) {
            return (
                <Form className='m-t-md'>
                    <Form.Field>
                        <TextArea style={this.state} id='fileContent' onChange={this.onContentChange}
                            value={this.props.analyser.snippetData.snippetContent}/>
                    </Form.Field>
                </Form>
            )
        }
        else {
            return (
                <Grid className='m-x-0 m-t-md m-b-0' columns={2}>
                    <Grid.Column width={9} className='p-l-0 p-r-sm p-y-0'>
                        <Form>
                            <Form.Field>
                                <TextArea style={this.state} id='fileContent' onChange={this.onContentChange} value={this.props.analyser.snippetData.snippetContent}/>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={7} className='p-l-sm p-r-0 p-y-0' style={{ height: window.innerHeight - 138, overflowY: 'auto' }}>
                        {
                            this.props.analyser.snippetData.snippetErrors.map((error, index) => {
                                return (
                                    <Message negative key={index}>
                                        <Message.Header>{error.errorString}</Message.Header>
                                        <b><u>Line</u>:</b> {error.errorLine}, <b><u>Position</u>:</b> {error.errorCharacter}
                                    </Message>
                                )
                            })
                        }
                    </Grid.Column>
                </Grid>
            )
        }
    }

    clearAnalyserForm = () => {
        this.props.dispatch(clearSnippetData())
    }

    processAnalyserFile = (file) => {
        try {
            let fileReader = new FileReader()
            fileReader.onload = (event) => {
                let fileContent = event.target.result
                document.getElementById('fileContent').value = fileContent
                this.props.dispatch(updateSnippetContent(fileContent))
            }
            fileReader.readAsText(file)
        }
        catch (error) {}
    }

    selectAnalyserFile = () => {
        document.getElementById('fileUploader').click()
        
    }

    onContentChange = (event, data) => {
        this.props.dispatch(updateSnippetContent(data.value))
    }

    onLanguageChange = (event, data) => {
        this.props.dispatch(updateSnippetLanguage(data.value))
    }

    performCodeAnalysis = async () => {
        if (this.props.analyser.snippetData.snippetId === 0) {
            RequestUtility.postRequest('/snippet', {
                snippetContent: this.props.analyser.snippetData.snippetContent,
                snippetLanguage: this.props.analyser.snippetData.snippetLanguage
            }).then((response) => {
                switch (response.statusCode) {
                    case 201: {
                        this.props.dispatch(updateSnippetData(response.body))
                        RequestUtility.getRequest('/snippet').then((response) => {
                            this.props.dispatch(updateSnippetHistory(JSON.parse(response.body).snippetsList))
                            PromptUtility.showPrompt({
                                type: 'success',
                                title: 'Success!',
                                content: 'Snippet has been analysed.'
                            })
                        }).catch((error) => console.log(error))
                        break
                    }
                    case 400: {
                        PromptUtility.showPrompt({
                            type: 'error',
                            title: 'Bad Request!',
                            content: 'The request was malformed.'
                        })
                        break
                    }
                    case 403: {
                        PromptUtility.showPrompt({
                            type: 'error',
                            title: 'Unauthorised!',
                            content: 'Operation is not permitted.'
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
            }).catch((error) => console.log(error))
        }
        else {
            RequestUtility.putRequest('/snippet', this.props.analyser.snippetData).then((response) => {
                switch (response.statusCode) {
                    case 200: {
                        this.props.dispatch(updateSnippetData(response.body))
                        RequestUtility.getRequest('/snippet').then((response) => {
                            this.props.dispatch(updateSnippetHistory(JSON.parse(response.body).snippetsList))
                            PromptUtility.showPrompt({
                                type: 'success',
                                title: 'Success!',
                                content: 'Snippet has been analysed.'
                            })
                        }).catch((error) => console.log(error))
                        break
                    }
                    case 400: {
                        PromptUtility.showPrompt({
                            type: 'error',
                            title: 'Bad Request!',
                            content: 'The request was malformed.'
                        })
                        break
                    }
                    case 403: {
                        PromptUtility.showPrompt({
                            type: 'error',
                            title: 'Unauthorised!',
                            content: 'Operation is not permitted.'
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
            }).catch((error) => console.log(error))
        }
        
    }

}

export default connect(mapStateToProps)(Analyser)