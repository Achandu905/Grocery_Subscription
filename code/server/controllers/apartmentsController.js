import * as apartmentService from "../service/apartmentsService.js";

export const createApartmentController = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.pincode || !data.address || !data.city) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }
    const result = await apartmentService.createApartment(data);
    res.status(201).json({
      message: "Apartment created successfully!",
      success: true,
      apartmentId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllApartmentsController = async (req, res) => {
  try {
    const apartments = await apartmentService.getAllApartments();
    res.status(200).json({ apartments, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getApartmentByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const apartment = await apartmentService.getApartmentById(id);
    if (!apartment) {
      return res
        .status(404)
        .json({ message: "Apartment not found", success: false });
    }
    res.status(200).json({ apartment, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const updateApartmentController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await apartmentService.updateApartment(id, data);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Apartment not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Apartment updated successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteApartmentController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await apartmentService.deleteApartment(id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Apartment not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Apartment deleted successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
