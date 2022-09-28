const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');

afterAll(() => db.end());
beforeEach(() => seed());

//users tests

describe('getUsers', () => {
	test('200: api/users responds with an object with the key of users and an array of user info', () => {
		return request(app)
			.get('/api/users')
			.expect(200)
			.then((res) => {
				expect(res.body).toBeInstanceOf(Object);
			});
	});
});

describe('postUsers', () => {
	test('201: api/users responds with the new users details returned', () => {
		return request(app)
			.post('/api/users')
			.expect(201)
			.then((res) => {
				expect(res.body);
			});
	});
});
