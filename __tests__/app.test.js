const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');

afterAll(() => db.end());
beforeEach(() => seed());

describe('user tests', () => {
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
				.send({ username: 'Owen', name: 'OJ', password: '1234' })
				.expect(201)
				.then((res) => {
					expect(res.body.user.username).toBe('Owen');
					expect(res.body.user.name).toBe('OJ');
				});
		});
	});
	// describe('patchUser', () => {
	// 	test('202 accepted: api/users/:username responds with the updated user details', () => {
	// 		return request(app).patch('/api/users/Owen');
	// 	});
	// });
});

describe('error testing', () => {
	test('404: GET api/user/ returns 404 not found', () => {
		return request(app)
			.get('/api/user')
			.expect(404)
			.then((res) => {
				expect(res.body.msg).toBe('invalid path');
			});
	});
	test('404: PATCH api/user/ returns 404 not found', () => {
		return request(app)
			.patch('/api/user')
			.expect(404)
			.then((res) => {
				expect(res.body.msg).toBe('invalid path');
			});
	});
});
