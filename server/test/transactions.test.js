import request from "supertest";
import { app, transactions } from "../src/app.js";

describe("Transasctiona API", () => {
  beforeEach(() => {
    ransactions.length = 0;
  });
    
    
    it('save transaction and return it', async () => {
        
        const payload = { amount: 25.5, description: 'Launch' }
        const postRes = await request(app).post('/api/transactions').send(payload).expect(201)

        expect(postRes.body.data).toMatchObject(payload);
        expect(postRes.body.data.id).toBeDefined();


        const getRes = await request(app)
        .get('/api/transactions')
        .expect(200);


        expect(getRes.body.data.length).toBe(1);
        expect(getRes.body.data[0]).toMatchObject(payload);


    })

    it('rejects invalid input', async () => {
        await request(app)
        .post('/api/transactions')
        .send({ amount: 0, description: '' })
        .expect(400);
    });
});
