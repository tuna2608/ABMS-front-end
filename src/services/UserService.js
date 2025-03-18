
export async function loginUser({usernameOrEmail,password}){
    const body = {
        usernameOrEmail,
        password,
    }
    const response = await fetch(`http://localhost:8080/api/login`,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    // if (!response.ok) {
    //     const error = new Error("An error occurred while login");
    //     error.code = response.status;
    //     error.info = await response.json();
    //     console.log(error);
    //     throw error;
    // }
    const { data } = await response.json();
    return data;
}

export async function resetPassword({ email }) {
    console.log("Reset password for:", email);

    const body = { email };

    const response = await fetch(`http://localhost:8080/api/reset-password`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = new Error("An error occurred while resetting password");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    console.log(data);

    return data;
}

// Thêm hàm đăng ký tài khoản mới
export async function registerUser({ fullName, email, password }) {
    console.log("Registering user:", fullName, email);

    const body = {
        fullName,
        email,
        password,
    };

    const response = await fetch(`http://localhost:8080/api/register`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = new Error("An error occurred while registering user");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data = await response.json();
    console.log(data);

    return data;
}
