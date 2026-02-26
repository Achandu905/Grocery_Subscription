import * as apartmentsRepository from "../repository/apartmentsRepository.js";
export const createApartment = async (data) => {
  return apartmentsRepository.addApartment(data);
};

export const getAllApartments = async () => {
  return apartmentsRepository.getAllApartments();
};

export const getApartmentById = async (id) => {
  return apartmentsRepository.getApartmentById(id);
};

export const updateApartment = async (id, data) => {
  return apartmentsRepository.updateApartment(id, data);
};

export const deleteApartment = async (id) => {
  return apartmentsRepository.deleteApartment(id);
};
