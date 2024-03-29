import supertest from "supertest";
import {web} from "../src/application/web.js"
import {logger} from "../src/application/logging.js";
import { removeTestUser, createTestUser, createTestAdmin, removeTestAdmin } from "./test-util.js";

describe('POST /register', function() {

    afterEach(async () => {
        await removeTestUser()
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


describe('POST /login', function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    })

    it('should be login', async () => {
        const result = await supertest(web)
        .post('/login')
        .send({
            username: "test",
            password: "test12345678"
        });

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.token).not.toBe("test")


    });

});

describe('GET /user/current', function () {

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can get current user', async () => {
        const result = await supertest(web)
        .get('/user/current')
        .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test")
    })

})

describe('GET /user', function () {
    // GET ALL BASIC USER

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can get all basic user', async () => {
        const result = await supertest(web)
        .get('/user')
        .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })

})

describe('GET /user', function () {
    // GET ALL ADMIN USER

    beforeEach(async () => {
        await createTestAdmin();
    });

    afterEach(async () => {
        await removeTestAdmin();
    });

    it('should can get all user', async () => {
        const result = await supertest(web)
        .get('/user')
        .set('Authorization', 'admin')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })

})