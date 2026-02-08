import * as apartmentsRepository from "../repository/apartmentsRepository.js";
export const createApartment = async (data) => {
  return await apartmentsRepository.addApartment(data);
};

export const getAllApartments = async () => {
  return await apartmentsRepository.getAllApartments();
};

export const getApartmentById = async (id) => {
  return await apartmentsRepository.getApartmentById(id);
};

export const updateApartment = async (id, data) => {
  return await apartmentsRepository.updateApartment(id, data);
};

export const deleteApartment = async (id) => {
  return await apartmentsRepository.deleteApartment(id);
};
