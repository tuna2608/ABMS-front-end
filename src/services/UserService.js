

export async function loginUser({usernameOrEmail,password}){
    console.log(usernameOrEmail+password);

    const body = {
        usernameOrEmail,
        password,
    }
    console.log(JSON.stringify(body));
    
    const response = await fetch(`http://localhost:8080/api/login`,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        const error = new Error('An error occurred while login');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { data } = await response.json();
    console.log(data);
    
    return data;
}