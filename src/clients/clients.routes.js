import express from "express";
import { addClients, listCompany, updateClients, generateExcelClients } from "../clients/clients.controller.js";
import { addClientes } from "../middlewere/client-validator.js";

const router = express.Router();

/**
 * @swagger
 * /client/add:
 *   post:
 *     summary: Agregar un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juanperez@email.com"
 *               telefono:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Cliente agregado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/add", addClientes, addClients);

/**
 * @swagger
 * /client/list:
 *   get:
 *     summary: Obtener la lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 */
router.get("/list", listCompany);

/**
 * @swagger
 * /client/update/{clientId}:
 *   put:
 *     summary: Actualizar datos de un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos López"
 *               telefono:
 *                 type: string
 *                 example: "87654321"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put("/update/:clientId", updateClients);

/**
 * @swagger
 * /client/report:
 *   get:
 *     summary: Generar reporte de clientes en Excel
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Archivo de Excel generado correctamente
 */
router.get("/report", generateExcelClients);

export default router;
