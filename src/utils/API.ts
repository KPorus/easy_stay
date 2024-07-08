"use server"
import { cookies } from 'next/headers'; // Assuming cookies is imported correctly from 'next/headers'

export async function login({ email, pass }: { email: string; pass: string }) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `https://national-voting-backend.vercel.app/api/v1/admin/login`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ email, pass }),
            cache: "no-store"
        });
        // if (!res.ok) {
        //     throw new Error('Failed to fetch data');
        // }

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


export async function logout() {
    try {
        const cookieStore = cookies(); // Assuming cookies() function is correctly defined
        cookieStore.delete('accessToken');
        return ; // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}

export async function getCookies() {
    try {
        const cookieStore = cookies(); // Assuming cookies() function is correctly defined
        return  cookieStore.get('accessToken'); // Return the entire response JSON if needed
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}


