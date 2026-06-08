import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://thinking-tester-contact-list.herokuapp.com';
let token: string;
test.describe.configure({mode: 'serial'});

// Test Case 1: Create User
test('Add New User via API with Dynamic Email', async ({ request }) => {
    const randomeEmail = `apiuser_${Date.now()}@fake.com`;
    console.log('Generating Unique Email', randomeEmail);

    const resp = await request.post(`${BASE_URL}/users`, {
        data: {
            firstName: 'Playwright',
            lastName: 'APIUser',
            email: randomeEmail,
            password: 'myPassword'
        }
    });

    expect(resp.status()).toBe(201);
    const responseBody = await resp.json();

    token = responseBody.token;
    console.log('SUCCESS: Token saved:', token);
});

// Test Case 2: Get User Profile (using the saved token!)
test('Get User Profile via API', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    expect(res.status()).toBe(200);

    const responseBody = await res.json();
    console.log('SUCCESS: Profile Details:', responseBody);
});