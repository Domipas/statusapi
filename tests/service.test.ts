import serverapp from "../ts/app"
import checher from "../ts/checker"
import request from "supertest";

const checkscript = new checher();
const app = serverapp(checkscript);
const auth = 'Bearer A4FmQ59LXt7eLr5HXr9CDlf4VaMNyqSWppIbFKhkZFCwHLzW733EAKqwWwGmfnV59qrBSje3qoS2seXwDnVehazMk935sD7Bgxl';

describe('Get all services', () => {
    it('should return all clients', async () => {
        const result: request.Response = await request(app)
            .get('/')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
})
describe('Get service', () => {
    it('should return service', async () => {
        const result: request.Response = await request(app)
            .get('/service')
            .set("Authorization", auth)
            .send({ 'service': '[]' })
        expect(result.status).toEqual(404)
    })
    it('should return service', async () => {
        const result: request.Response = await request(app)
            .get('/service/')
            .set("Authorization", auth)
            .send({ 'service': '[]' })
        expect(result.status).toEqual(404)
    })
})
describe('Get time', () => {
    it('should return time', async () => {
        const result: request.Response = await request(app)
            .get('/time')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
    it('should return client time', async () => {
        const result: request.Response = await request(app)
            .get('/time/')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
})