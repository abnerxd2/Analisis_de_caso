import Client from "../clients/clients.model.js"
import ExcelJS from "exceljs";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

export const addClients = async(req,res)=>{
    try {
        const data = req.body;
        const clients = await Client.create(data);
        res.status(200).json({
            message: "client  has been aggregate"
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to add client"
        })
        
    }
}



export const listCompany = async (req, res) => {
    try {
        const { FilterFor = '', categorySpecific = '' } = req.query;

        let sortCriterion = {};
        let query = {};

        if (FilterFor === 'category') {
            if (!categorySpecific) {
                return res.status(400).json({
                    message: "No se proporcionó una categoría",
                });
            }
            query.category = categorySpecific;
        } else {
            switch (FilterFor) {
                case 'A-Z':
                    sortCriterion = { name: 1 };
                    break;
                case 'Z-A':
                    sortCriterion = { name: -1 };
                    break;
                case 'yearTrajectoryAscendant':
                    sortCriterion = { yearTrajectory: 1 };
                    break;
                case 'yearTrajectoryDescendant':
                    sortCriterion = { yearTrajectory: -1 };
                    break;
            }
        }
        const companies = await Client.find(query).sort(sortCriterion);

        return res.status(200).json({
            message: "Empresas obtenidas correctamente",
            companies,
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};




export const updateClients = async (req, res) =>{

    const { clientId } = req.params; 
    const dataToUpdate = req.body;  
    
    try {
      
        const updatedClient = await Client.findByIdAndUpdate(clientId, dataToUpdate, { new: true });
    
        if (!updatedClient) {
        return res.status(404).json({ message: "Cliente no encontrado" });
        }
        return res.status(200).json({
        message: "Cliente actualizado exitosamente",
        updatedClient
        });
    } catch (err) {
        console.error('Error al actualizar el cliente:', err);
        return res.status(500).json({ message: 'Hubo un error al actualizar el cliente', error: err.message });
    }
}

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

export const generateExcelClients = async (req, res) => {
    try {
      
        const clients = await Client.find();
        if (!clients || clients.length === 0) {
            return res.status(404).json({
                message: "No clients found"
            });
        }

      
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Clients Report");

       
        worksheet.columns = [
            { header: "Nombre", key: "name", width: 30 },
            { header: "Puntuación", key: "puntuacion", width: 15 },
            { header: "Trayectoria (años)", key: "trajectory", width: 20 },
            { header: "Categoría", key: "category", width: 30 }
        ];

        
        clients.forEach(client => {
            worksheet.addRow({
                name: client.name,
                puntuacion: client.puntuacion,
                trajectory: client.trajectory,
                category: client.category
            });
        });

        
        const dir = path.join(__dirname, 'reports');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        
        const filePath = path.join(dir, `clients_report.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        
        res.status(200).json({
            message: "Excel file generated successfully",
            filePath: filePath
        });
    } catch (error) {
        console.error("Error generating Excel:", error);
        return res.status(500).json({
            message: "Failed to generate excel",
            error: error.message
        });
    }
};