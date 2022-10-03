const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test/index');

afterAll(() => db.end());
beforeEach(() => seed(testData));

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
	describe('patchUser', () => {
		test('202 accepted: api/users/:username responds with the updated user details', () => {
			return request(app)
				.patch('/api/users/butter_bridge')
				.send({ name: 'Owen Corrigan' })
				.expect(202)
				.then((res) => {
					expect(res.body.name).toBe('Owen Corrigan');
				});
		});
	});
	describe('deleteUser', () => {
		test('200 ok: api/users/:username responds with with ok and no user data', () => {
			return request(app).delete('/api/users/butter_bridge').expect(204);
		});
	});
});

describe('error testing', () => {
	describe('GET user errors', () => {
		test('404: GET api/user/ returns 404 not found', () => {
			return request(app)
				.get('/api/user')
				.expect(404)
				.then((res) => {
					expect(res.body.msg).toBe('invalid path');
				});
		});
	});
	describe('PATCH user errors', () => {
		test('404: PATCH api/user/ returns 404 not found', () => {
			return request(app)
				.patch('/api/user/butter_bridge')
				.expect(404)
				.then((res) => {
					expect(res.body.msg).toBe('invalid path');
				});
		});
	});
	describe('POST user errors', () => {
		test('400 POST api/users/ returns 400 with information missing', () => {
			return request(app)
				.post('/api/users')
				.send({ name: 'Owen', password: 'password' })
				.expect(400)
				.then((res) => {
					expect(res.body.msg).toBe('bad request');
				});
		});
		test('400 POST api/users/ returns bad request, duplicate username', () => {
			return request(app)
				.post('/api/users')
				.send({ username: 'butter_bridge', name: 'Owen', password: 'password' })
				.expect(400)
				.then((res) => {
					expect(res.body.msg).toBe('bad request');
				});
		});
	});
});
