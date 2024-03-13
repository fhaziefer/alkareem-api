import supertest from "supertest";
import {web} from "../src/application/web.js"
import {prismaClient} from "../src/application/database.js"
import {logger} from "../src/application/logging.js";

describe('POST /register', function() {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/register')
        .send({
            username: "test",
            password: "test12345678"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.password).toBeDefined();


    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
        .post('/register')
        .send({
            username: "",
            password: ""
        });

        logger.info(result.body)

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();


    });

});