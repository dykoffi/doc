"use strict"

const generalDocs = require("./info.json")

const MemoireDocs = require('../api/Memoire/docs.json') 

module.exports = {
    ...generalDocs,
    paths: { 
        ...MemoireDocs,
    }
}