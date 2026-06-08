import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://thinking-tester-contact-list.herokuapp.com';
let token: string;
let contactID: string;

test.describe.configure({ mode: 'serial'});

test.beforeAll(async ({ request }) => {
    console.log('--- SETUP: Registering a new user for contact tests ---');
    const randomEmail = `apiuser_${Date.now()}@fake.com`;

    const resp = await request.post(`${BASE_URL}/users`, {
        data: {
            firstName: 'API',
            lastName: 'Tester',
            email: randomEmail,
            password: 'myPassword'
        }
    });

    expect(resp.status()).toBe(201);
    const responseBody = await resp.json();
    token = responseBody.token;
});

// 2. TEST CASE 5: Add Contact
test('Add Contact via API', async ({ request }) => {
    const resp = await request.post(`${BASE_URL}/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` },
        data: {
            firstName: 'John',
            lastName: 'Doe',
            birthdate: '1970-01-01',
            email: 'jdoe@fake.com',
            phone: '8005555555',
            street1: '1 Main St.',
            street2: 'Apartment A',
            city: 'Anytown',
            stateProvince: 'KS',
            postalCode: '12345',
            country: 'USA'
        }
    });
    expect(resp.status()).toBe(201);
    const responseBody = await resp.json();
    contactID = responseBody._id;
    console.log('SUCCESS: Contact created with ID:', contactID);
});

// 3. TEST CASE 7: Get Single Contact
test('Get Single Contact via API', async ({ request }) => {
    const resp = await request.get(`${BASE_URL}/contacts/${contactID}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    expect(resp.status()).toBe(200);
    const responseBody = await resp.json();
    expect(responseBody.firstName).toBe('John');
});

// 4. TEST CASE 8: Update Contact (PUT)
test('Update Contact Full (PUT) via API', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/contacts/${contactID}`, {
        headers: { 'Authorization': `Bearer ${token}`},
        data: {
            firstName: 'Amy',
            lastName: 'Miller',
            birthdate: '1992-02-02',
            email: 'amiller@fake.com',
            phone: '8005554242',
            street1: '13 School St.',
            street2: 'Apt. 5',
            city: 'Washington',
            stateProvince: 'QC',
            postalCode: 'A1A1A1',
            country: 'Canada'
        }
    });
    expect(res.status()).toBe(200);
    const responseBody = await res.json();
    expect(responseBody.firstName).toBe('Amy');
    console.log('SUCCESS: Contact updated via PUT. Name is now:', responseBody.firstName);
});

// 5. TEST CASE 9: Update Contact (PATCH)
test('Update Contact Partial (PATCH) via API', async ({ request }) => {
    const resp = await request.patch(`${BASE_URL}/contacts/${contactID}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        data: {
            firstName: 'Anna'
        }
    });
    expect(resp.status()).toBe(200);
    const responseBody = await resp.json();
    expect(responseBody.firstName).toBe('Anna');
    console.log('SUCCESS: Contact updated via PATCH. Name is now: ', responseBody.firstName);
});

// 6. TEARDOWN: This runs ONCE after all tests in this file are finished!
test.afterAll(async ({ request }) => {
    console.log('--- TEARDOWN: Logging out and destroying the token ---');
    const resp = await request.post(`${BASE_URL}/users/logout`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(resp.status()).toBe(200);
    console.log('SUCCESS: Token destroyed successfully!');
});