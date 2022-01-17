"use strict"

const router = require('express').Router()
const { memoire } = require('../../db')

router

    /**
     * @descr Create new memoire
     * @route POST /memoire
     * @access public
     */

    .post("/", async (req, res) => {

        memoire.create({ data: req.body })
            .then(data => { res.status(201).json(data) })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'InternalError', message: "Something wrong" })
            })

    })

    /**
    * @descr get all memoire
    * @route GET /memoire
    * @access public
    */

    .get("/", async (req, res) => {

        memoire.findMany({ where: req.query, orderBy: { id_: 'asc' } })
            .then(data => { res.json(data) })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'InternalError', message: "Something wrong" })
            })

    })

    /**
    * @descr Show specify memoire identified by id
    * @route GET /memoire/id
    * @access public
    */

    .get("/:id", async (req, res) => {

        memoire.findUnique({ where: { id_: parseInt(req.params.id) } })
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ error: 'NotFound', message: "Record not found" })
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'InternalError', message: "Something wrong" })
            })

    })

    /**
    * @descr Modify specify memoire identified by id
    * @route PUT /memoire/id
    * @access public
    */

    .put("/:id", async (req, res) => {

        memoire.update({ where: { id_: parseInt(req.params.id) }, data: req.body })
            .then(() => {
                res.status(201).json({ message: "memoire updated succefully" })
            })
            .catch(error => {

                console.error(error);
                if (error?.code === "P2025") {
                    res.status(404).json({ error: 'NotFound', message: error.meta?.cause })
                } else {
                    res.status(500).json({ error: 'InternalError', message: "Something wrong" })
                }

            })

    })

    /**
    * @descr Delete specify memoire identified by id
    * @route DELETE /memoire/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        memoire.delete({ where: { id_: parseInt(req.params.id) } })
            .then(() => {
                res.status(201).json({ message: "memoire deleted succefully" })
            })
            .catch(error => {
                console.error(error);
                if (error?.code === "P2025") {
                    res.status(404).json({ error: error.name, message: error.meta?.cause })
                } else {
                    res.status(500).json({ error: 'InternalError', message: "Something wrong" })
                }
            })

    })

module.exports = router
