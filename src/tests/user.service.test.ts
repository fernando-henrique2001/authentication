require('dotenv/config');
import { userService } from "../services";
import repository from "../repositories/user";

describe('Test My app server', () => {

    test("should verify email exists", async () => {

        jest.spyOn(repository, "getUser").mockResolvedValueOnce({
            id: 1,
            name: 'Fernando',
            email: 'fernando@mail.com',
            password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
            created_at: null,
            updated_at: null
        });

        expect(await userService.verifyEmailExists("fernando@mail.com")).toStrictEqual(
            {
                id: 1,
                name: 'Fernando',
                email: 'fernando@mail.com',
                password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
                created_at: null,
                updated_at: null
            }
        );

    });

    test("should get user by id", async () => {

        jest.spyOn(repository, "getUserById").mockResolvedValueOnce({
            id: 1,
            name: 'Fernando',
            email: 'fernando@mail.com',
            password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
            created_at: null,
            updated_at: null
        });

        expect(await userService.getUserById("1")).toStrictEqual(
            {
                id: 1,
                name: 'Fernando',
                email: 'fernando@mail.com',
                password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
                created_at: null,
                updated_at: null
            }
        );
    })

    it("should create user", async () => {

        jest.spyOn(repository, "createUser").mockResolvedValueOnce([5]);
        jest.spyOn(repository, "getUser").mockResolvedValueOnce(undefined);


        const user = {
            name: "Gabriela",
            email: "gabriela@mail.com",
            password: "@Gabriela123",
        }


        expect(await userService.createUser(user, "@Gabriela123")).toStrictEqual(
            [5]
        );
    })

    it("should check password", async () => {

        expect(await userService.checkPassword("fernando123", "$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92"));
    })

    test("should check get token", async () => {

        jest.spyOn(repository, "getUser").mockResolvedValueOnce({
            id: 1,
            name: 'Fernando',
            email: 'fernando@mail.com',
            password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
            created_at: null,
            updated_at: null
        });

        const res = await userService.getToken({ email: 'fernando@mail.com', password: "fernando123" });
        expect(res).toStrictEqual(
            {
                message: "success",
                token: res.token
            }
        );
    });
})