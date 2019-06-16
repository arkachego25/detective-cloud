import React from 'react'
import { Icon } from 'semantic-ui-react'
import { toastr } from 'react-redux-toastr'

export function showPrompt(prompt) {
    let toastOptions = {
        timeOut: 5000,
        newestOnTop: true,
        position: 'bottom-left',
        transitionIn: 'fadeIn',
        transitionOut: 'fadeOut',
        progressBar: true,
        showCloseButton: true
    }
    switch (prompt.type) {
        case 'success': {
            toastr.success(prompt.title, prompt.content, Object.assign({}, toastOptions, { icon: <Icon name='check' size='big' className='p-t-xs'/> }))
            break
        }
        case 'warning': {
            toastr.warning(prompt.title, prompt.content, Object.assign({}, toastOptions, { icon: <Icon name='exclamation triangle' size='big' className='p-t-xs'/> }))
            break
        }
        case 'error': {
            toastr.error(prompt.title, prompt.content, Object.assign({}, toastOptions, { icon: <Icon name='ban' size='big' className='p-t-xs'/> }))
            break
        }
        case 'info': {
            toastr.info(prompt.title, prompt.content, Object.assign({}, toastOptions, { icon: <Icon name='info circle' size='big' className='p-t-xs'/> }))
            break
        }
        default: {
            toastr.light(prompt.title, prompt.content, Object.assign({}, toastOptions, { icon: <Icon name='bullseye' size='big' className='p-t-xs'/> }))
            break
        }
    }
}