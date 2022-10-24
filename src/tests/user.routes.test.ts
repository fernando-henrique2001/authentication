import request from "supertest";
import { app } from "../app";
import repository from "../repositories/user";

describe('Test My app server', () => {



    it("should get register route", async () => {

        jest.spyOn(repository, "createUser").mockResolvedValueOnce([5]);
        jest.spyOn(repository, "getUser").mockResolvedValueOnce(undefined);

        const res = await request(app).post('/user').send(
            {
                name: 'Gabriela',
                email: "gabriel@mail.com",
                password: "@Gabriela123",
                confirmPassword: "@Gabriela123"
            }
        );
        expect(res.status).toEqual(200);
        expect(res.body.message).toBe("User registered successfully");

    });

    it("should get login route", async () => {

        jest.spyOn(repository, "getUser").mockResolvedValueOnce({
            id: 1,
            name: 'Fernando',
            email: 'fernando@mail.com',
            password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
            created_at: null,
            updated_at: null
        });

        const res = await request(app).get('/user/login').send(
            {
                email: "fernando@mail.com",
                password: "fernando123"
            }
        );
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('token');
    })

    it("should get perfil route", async () => {

        jest.spyOn(repository, "getUserById").mockResolvedValueOnce({
            id: 1,
            name: 'Fernando',
            email: 'fernando@mail.com',
            password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
            created_at: null,
            updated_at: null
        });


        const res = await request(app).get('/user/perfil').set({ Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjYxNjU5MSwiZXhwIjoxNjY2NjIyNTkxfQ.zIHmfYAzSpeLuVZPN2hSBf0XJMoqBs9NQoB2EzrSnyY` });

        console.log(res.headers)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("email");
    })
})