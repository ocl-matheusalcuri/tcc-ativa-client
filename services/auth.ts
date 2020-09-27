interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({token: 'dlkfjhsdklfh3f9384f3huh',
            user: {
                name: 'Alcuri',
                email: 'alcuri@ff.com'
            }})
        }, 2000)
    })
}