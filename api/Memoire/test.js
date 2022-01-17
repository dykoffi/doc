"use strict"

const frisby = require('frisby')

const URL = "http://localhost:8888"

describe('Memoire routes tester', () => {

    it("/POST Create new Memoire", () => {
        return frisby
            .post(`${URL}/Memoire`)
            .expectNot("status", 500);
    });

    it("/GET get all Memoire", () => {
        return frisby
            .get(`${URL}/Memoire`)
            .expectNot("status", 500)
    });

    it("/GET/id Show specify Memoire", () => {
        return frisby
            .get(`${URL}/Memoire/1`)
            .expectNot("status", 500)
    });

    it("/PUT/id Modify specify Memoire", () => {
        return frisby
            .put(`${URL}/Memoire/1`)
            .expectNot("status", 500)
    });

    it("/DELETE/id Delete specify Memoire", () => {
        return frisby
            .del(`${URL}/Memoire/1`)
            .expectNot("status", 500)
    });

});