import { Profile } from "../model";

export const getAllProfiles = async (clientType) => {
  return await Profile.findAll({
    where: {
      type: clientType,
    },
  });
};

export const getProfile = async (id) => {
  return await Profile.findOne({
    where: {
      id: id,
    },
  });
};

export const getContractorProfile = async (contractorId) => {
  return await Profile.findOne({
    where: {
      ContractorId: contractorId,
    },
  });
};

export const updateProfileById = async (
  profileId,
  fieldToUpdate,
  valueToUpdate,
  t
) => {
  return await Profile.update(
    {
      [fieldToUpdate]: valueToUpdate,
    },
    {
      where: {
        id: profileId,
      },
    },
    { transaction: t }
  );
};

export const depositAmountForClient = async (id, amount, t) => {
  return await Profile.update(
    {
      balance: amount,
    },
    {
      where: {
        id: id,
      },
    },
    { transaction: t }
  );
};
