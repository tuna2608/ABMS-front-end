

export async function loginUser({body}){
    console.log(body);

    // console.log(JSON.stringify(body));

    
    const response = await fetch(`http://localhost:8080/api/login`,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/application/json',
        }
    })

    if (!response.ok) {
        const error = new Error('An error occurred while login');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { user } = await response.json();
    return user;
}