import serverapp from "../ts/app"
import checher from "../ts/checker"
import request from "supertest";

const checkscript = new checher();
const app = serverapp(checkscript);
const auth = 'Bearer A4FmQ59LXt7eLr5HXr9CDlf4VaMNyqSWppIbFKhkZFCwHLzW733EAKqwWwGmfnV59qrBSje3qoS2seXwDnVehazMk935sD7Bgxl';

describe('Get version', () => {
    it('should return version', async () => {
        const result: request.Response = await request(app)
            .get('/version')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
    it('should return version', async () => {
        const result: request.Response = await request(app)
            .get('/version/')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
})
describe('Post update', () => {
    it('should update the data', async () => {
        const result: request.Response = await request(app)
            .post('/update')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
    it('should update the data', async () => {
        const result: request.Response = await request(app)
            .post('/update/')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
})
describe('Post client update', () => {
    it('should update the client data', async () => {
        const result: request.Response = await request(app)
            .post('/clients/update')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
    it('should update the client data', async () => {
        const result: request.Response = await request(app)
            .post('/clients/update/')
            .set("Authorization", auth)
            .send()
        expect(result.status).toEqual(200)
    })
})