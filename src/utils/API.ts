"use server"
import { cookies } from 'next/headers'; // Assuming cookies is imported correctly from 'next/headers'

export async function login({ email, pass }: { email: string; pass: string }) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `http://localhost:5000/api/v1/admin/login`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ email, pass }),
            cache: "no-store"
        });
  
        const tokenResponse = await res.json();
        // Set the accessToken as a cookie
        const cookieStore = cookies(); // Assuming cookies() function is correctly defined
        cookieStore.set('accessToken', tokenResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1, // One hour
            path: '/',
        }
        );

        return tokenResponse; // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}
export async function register({ hotelName, email, pass, phoneNo }: {
    hotelName: string;
    email: string,
    pass: string,
    phoneNo: string
}) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `http://localhost:5000/api/v1/admin/register`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ hotelName, email, pass, phoneNo }),
        });
        // if (!res.ok) {
        //     throw new Error('Failed to fetch data');
        // }

        const response = await res.json();
        return response;
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}


export async function logout() {
    try {
        const cookieStore = cookies(); // Assuming cookies() function is correctly defined
        cookieStore.delete('accessToken');
        return; // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}

export async function getCookies() {
    try {
        const cookieStore = cookies(); // Assuming cookies() function is correctly defined
        return cookieStore.get('accessToken'); // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}

export async function upload(formData: FormData) {
    const url = `http://localhost:5000/api/v1/admin/update-personal-info`;

    try {
        const cookies = await getCookies();

        if (!cookies) {
            throw new Error('Authorization token is missing');
        }

        const headers: { [key: string]: string } = {
            "authorization": cookies.value as string
        };

        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: formData,
            cache: 'no-store',
        });

        const response = await res.json();
        console.log(response);
        return response; // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during upload:', err);
        return null;
    }
}



export async function getPersonalInfo(id:string) {
    const url = `http://localhost:5000/api/v1/admin/get-personal-info`;

    try {
        const cookies = await getCookies();

        if (!cookies) {
            throw new Error('Authorization token is missing');
        }

        const headers: { [key: string]: string } = {
            "authorization": cookies.value as string,
            'Content-Type':'application/json'
        };
        
        const res = await fetch(url, {
            method: 'POST',
            headers,
            body:JSON.stringify({id:id}),
            cache: 'no-store',
        });

        const response = await res.json();
        console.log(response);
        return response; // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during upload:', err);
        return null;
    }
}

export async function deleteAccount(id:string) {
    const url = `http://localhost:5000/api/v1/admin/delete-account`;

    try {
        const cookies = await getCookies();

        if (!cookies) {
            throw new Error('Authorization token is missing');
        }

        const headers: { [key: string]: string } = {
            "authorization": cookies.value as string,
            'Content-Type':'application/json'
        };
        
        const res = await fetch(url, {
            method: 'POST',
            headers,
            body:JSON.stringify({id:id}),
            cache: 'no-store',
        });

        const response = await res.json();
        console.log(response);
        // if(response.statusCode === 200){
           
        // }
        return response; // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during upload:', err);
        return null;
    }
}