import { apiDeleteWithToken, apiGet, apiGetWithToken,apiPost, apiPostWithToken, apiPut, apiPutWithToken } from "./apiCall";
import {
  deleteUserApi,
  getAllAccountsApi,
  getBankUserInfoApiUrl,
  getBussinessCategoryApiUrl,
  getBussinessTypesApiUrl,
  getUserDataApi,
  postAddUserWithRoleApi,
  postBankAccountApi,
  postRegisterApiUrl,
  putBankAccountApi,
  putModifyAccountApi,
  putUpdateUserApi,
  uploadKybDocumentApi,
  deleteKybDocumentApi,
  downloadKybDocumentApi,
  uploadKycDocumentApi,
  downloadKycDocumentApi,
  deleteKycDocumentApi
} from "./constants";

export const getBussinessTypes = async () => {
  const response = await apiGet(getBussinessTypesApiUrl);
  return response;
};

export const postRegister = async (data) => {
  const response = await apiPost(postRegisterApiUrl, data);
  return response;
};
export const getUserData = async (accountId, token) => {
  const response = await apiGetWithToken(getUserDataApi + accountId, token);
  return response;
};

export const getBussinessCategory = async (token) => {
  const response = await apiGetWithToken(getBussinessCategoryApiUrl, token);
  return response;
};

export const getBankUserInfo = async (accountId, token) => {
  const response = await apiGetWithToken(getBankUserInfoApiUrl(accountId), token);
  return response;
};

export const putModifyAccount = async (accountId, token, data) => {
  const response = await apiPutWithToken(putModifyAccountApi(accountId), token, data);
  return response;
};

export const postBankAccount = async (accountId, token, data) => {
  const response = await apiPostWithToken(postBankAccountApi(accountId), token, data);
  return response;
};

export const putBankAccount = async (accountId, token, data, bankId) => {
  const response = await apiPutWithToken(putBankAccountApi(accountId, bankId), token, data);
  return response;
};

export const uploadKybDocument = async (accountId, token, data) => {
  const response = await apiPostWithToken(uploadKybDocumentApi(accountId), token, data);
  return response;
};

export const deleteKybDocument = async (accountId, businessId, token) => {
  const response = await apiDeleteWithToken(deleteKybDocumentApi(accountId, businessId), token);
  return response;
};

export const downloadKybDocument = async (accountId, businessId, token) => {
  const response = await apiGetWithToken(downloadKybDocumentApi(accountId, businessId), token);
  return response;
};

export const uploadKycDocument = async (accountId, ownerId, token, data) => {
  const response = await apiPostWithToken(uploadKycDocumentApi(accountId, ownerId), token, data);
  return response;
};

export const downloadKycDocument = async (accountId, businessId,ownerId, token) => {
  const response = await apiGetWithToken(downloadKycDocumentApi(accountId, businessId,ownerId), token);
  return response;
};

export const deleteKycDocument = async (accountId, businessId,ownerId, token) => {
  const response = await apiDeleteWithToken(deleteKycDocumentApi(accountId, businessId,ownerId), token);
  return response;
};

export const getAllAccounts = async(accountId,token,count,from,skip,to) => {
  const response = await apiGetWithToken(getAllAccountsApi(accountId,count,from,skip,to),token);
  return response;
}
export const postAddUserWithRole = async(accountId,token,data)=>{
  const response = await apiPostWithToken(postAddUserWithRoleApi(accountId),token,data)
  return response;
}
export const putUpdateUser = async(accountId,userId,token,data)=>{
  const response = await apiPutWithToken(putUpdateUserApi(accountId,userId),token,data)
  return response;
}
export const deleteUser = async(accountId,userId,token)=>{
  const response = await apiDeleteWithToken(deleteUserApi(accountId,userId),token)
  return response;
}