export function nameValidation(name) {
    const error = []

    if (name === '') {
        error.push('username required')
    }

    return error
}

export function emailValidator(email){
    const error = []

    if (email === ''){
        error.push('required')
    } else if (!email.endsWith('@gmail.com' || '@yahoomail.com')) {
        error.push('must include @gmail.com @yahoomail.com')
    }

    return error
}

export function passwordValidator(password) {
    const error = []

    if (password === '') {
        error.push('required')
    } else if (!password.match(/[A-Z]/)) {
        error.push('must include an uppercase')
    } else if (!password.match(/[a-z]/)) {
        error.push('must include a lowercase')
    } else if (!password.match(/[0-9]/)) {
        error.push('must include a number')
    } else if (password.length < 8){
        error.push('length must be more than 8')
    }

    return error
}