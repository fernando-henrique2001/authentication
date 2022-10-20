import request from "supertest";
import { app } from "../app";

describe('Test My app server', () => {
    it("should get register route", async () => {
        const res = await request(app).post('/user').send(
            {
                name: 'Gabriel',
                email: "gabriel@mail.com",
                password: "@Gabriel123",
                confirmPassword: "@Gabriel123"
            }
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("User registered successfully");

    })
    let token: string;
    it("should get login route", async () => {
        const res = await request(app).get('/user/login').send(
            {
                email: "fernando@mail.com",
                password: "fernando123"
            }
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body['token'];
    })

    it("should get perfil route", async () => {
        const res = await request(app).get('/user/perfil').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("email");
    })
})