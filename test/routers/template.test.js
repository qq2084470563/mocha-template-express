const app = require('../../server')
const request = require('supertest')(app)
const assert = require('power-assert')
describe('# test routers', function () {
	// 定义公共请求数据
	const temp = {
		name: 'mocha-test',
		template: '<h2>Hello ${name}</h2>',
		data: '{name:"mocha"}',
	}
	// get
	it('GET /cjy/v1/template', (done) => {
		request
			.get('/cjy/v1/template')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				assert(res.body.code === 200)
				assert(res.body.msg === 'success')
				assert(Array.isArray(res.body.data), '返回数据应该是数组类型')
				done()
			})
	})
	// post
	it('POST /cjy/v1/template', (done) => {
		request
			.post('/cjy/v1/template', temp)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				assert(res.body.code === 200)
				assert(res.body.msg === 'success')
				assert(
					typeof res.body.data === 'object',
					'返回数据应该是对象类型'
				)
				assert(res.body.data._id !== undefined, '应返回新增元素数据')

				done()
			})
	})
	// get ID
	it('GET /cjy/v1/template/:id', (done) => {
		request
			.get('/cjy/v1/template/6372edcaddf961bd599c4286')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				assert(res.body.code === 200)
				assert(res.body.msg === 'success')
				assert(
					typeof res.body.data === 'object',
					'返回数据应该是对象类型'
				)
				assert(res.body.data.name === 'test', '返回数据应和数据库一致')
				done()
			})
	})
	// bad get ID
	it('GET /cjy/v1/template/:id  bad Id', (done) => {
		request
			.get('/cjy/v1/template/6372edcaddf961bd599c4281')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				assert(res.body.code === 400)
				assert(res.body.msg === 'success')
				assert(
					typeof res.body.data === 'object',
					'返回数据应该是对象类型'
				)
				done()
			})
	})
	// put
	it('PUT /cjy/v1/template/:id', (done) => {
		request
			.put('/cjy/v1/template/6372edcaddf961bd599c4286', temp)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				assert(res.body.code === 200)
				assert(res.body.msg === 'success')
				assert(
					typeof res.body.data === 'object',
					'返回数据应该是对象类型'
				)
				assert(res.body.data.name === 'test', '返回数据应和入参一致')
				done()
			})
	})
	// delete
	it('DELETE /cjy/v1/template/:id', (done) => {
		request
			.delete('/cjy/v1/template/63720f901eaf0a808c410a1c')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				assert(res.body.code === 200)
				assert(res.body.msg === '删除成功')
				done()
			})
	})
})
