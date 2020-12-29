import serverapp from "../ts/app"
import checher from "../ts/checker"
import request from "supertest";

const checkscript = new checher();
const app = serverapp(checkscript);
const auth = 'Bearer A4FmQ59LXt7eLr5HXr9CDlf4VaMNyqSWppIbFKhkZFCwHLzW733EAKqwWwGmfnV59qrBSje3qoS2seXwDnVehazMk935sD7Bgxl';

describe('Post login', () => {
    it('should return true', async () => {
        const result: request.Response = await request(app)
            .post('/login/')
            .set("Authorization", auth)
            .send({ 'loginkey': 'Sx5gpwNnOdD0vtx1x4Ymau4LowkCwurF0cWWSc8b2Ns4gBZ177ZUtPSQo1LwS63qOg2jKSPhFFK6gGJ4ev7SmX9WIi1K4caz7NC' })
        expect(result.status).toEqual(200)
    })
    it('should return false', async () => {
        const result: request.Response = await request(app)
            .post('/login/')
            .set("Authorization", auth)
            .send({ 'loginkey': 'zxaYGaMHL5fjd29f6E0xseuzDznvjPHUOfBZ682GRXDF3yFP8PXF5CbyAN6O0Qk0QdHyzcVB7erEUQT3JRIfrFiUAgjUUhUm882' })
        expect(result.status).toEqual(403)
    })
})
describe('Get login', () => {
    it('should return true', async () => {
        const result: request.Response = await request(app)
            .get('/login/')
            .set("Authorization", auth)
            .send({ 'loginkey': 'Sx5gpwNnOdD0vtx1x4Ymau4LowkCwurF0cWWSc8b2Ns4gBZ177ZUtPSQo1LwS63qOg2jKSPhFFK6gGJ4ev7SmX9WIi1K4caz7NC' })
        expect(result.status).toEqual(200)
    })
    it('should return false', async () => {
        const result: request.Response = await request(app)
            .get('/login/')
            .set("Authorization", auth)
            .send({ 'loginkey': 'zxaYGaMHL5fjd29f6E0xseuzDznvjPHUOfBZ682GRXDF3yFP8PXF5CbyAN6O0Qk0QdHyzcVB7erEUQT3JRIfrFiUAgjUUhUm882' })
        expect(result.status).toEqual(403)
    })
})