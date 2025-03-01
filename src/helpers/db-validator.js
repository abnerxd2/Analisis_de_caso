import User from "../clients/clients.model.js"

export const clientNameExists = async (name = "") => {
    const existe = await User.findOne({ name });
    if (existe) {
        throw new Error(`Ya existe esa compañia en la base de datos "${name}"`);
    }
};
