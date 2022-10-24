require('dotenv/config');
import { userService } from "../services";
import repository from "../repositories/user";

describe('Test My app server', () => {

    const OLD_ENV = process.env;


    test("should email exists", async () => {

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

    test("should be no email", async () => {

        jest.spyOn(repository, "getUser").mockResolvedValueOnce(undefined);

        expect(await userService.verifyEmailExists("fernando@mail.com")).toStrictEqual(
            undefined
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

    test("should not get user by id", async () => {

        jest.spyOn(repository, "getUserById").mockResolvedValueOnce(undefined);

        expect(await userService.getUserById("1")).toStrictEqual(undefined
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

    test("should not create user: Email already exists", async () => {

        jest.spyOn(repository, "createUser").mockResolvedValueOnce([7]);
        jest.spyOn(repository, "getUser").mockResolvedValueOnce({
            name: "Gabriela",
            email: "gabriela@mail.com",
            password: "@Gabriela123",
        });


        const user = {
            name: "Gabriela",
            email: "gabriela@mail.com",
            password: "@Gabriela123",
        }


        expect(async () => {
            await userService.createUser(user, "@Gabriela123")
        }).rejects.toThrow('CONFLICT');
    })

    it("should not create user: Different passwords", async () => {

        jest.spyOn(repository, "createUser").mockResolvedValueOnce([5]);
        jest.spyOn(repository, "getUser").mockResolvedValueOnce(undefined);


        const user = {
            name: "Gabriela",
            email: "gabriela@mail.com",
            password: "@Gabriela123",
        }


        expect(async () => {
            await userService.createUser(user, "@Gabriela23")
        }).rejects.toThrow();
    })

    it("should check password", async () => {

        expect(await userService.checkPassword("fernando123", "$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92"));
    })

    test("should check password: Invalid email or password", async () => {

        expect(async () => {
            await userService.checkPassword("fernando12", "2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92")
        }).rejects.toThrow();
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

    test("should check get token: Invalid email", async () => {

        jest.spyOn(repository, "getUser").mockResolvedValueOnce(undefined);


        expect(async () => {
            await userService.getToken({ email: 'fernando@mail.com', password: "fernando123" });
        }).rejects.toThrow();
    });

    test("should check get token: null process.env null", async () => {

        process.env = {};

        jest.spyOn(repository, "getUser").mockResolvedValueOnce({
            id: 1,
            name: 'Fernando',
            email: 'fernando@mail.com',
            password: '$2b$10$9kERtFfacE6YMmZuBPNIPe5dxVigGYabkj3xykgXWQHJ9qzVkz.92',
            created_at: null,
            updated_at: null
        });

        expect(async () => {
            await userService.getToken({ email: 'fernando@mail.com', password: "fernando123" });
        }).rejects.toThrow();

    });
})