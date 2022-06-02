const BASE_URL = "/ums/v1";
// const BASE_URL = "https://stoplight.io/mocks/spg/spg/39227967/ums/v1";

// API's

export const getBussinessTypesApiUrl = BASE_URL + "/businessType";

export const getBankUserInfoApiUrl = (accountId) => {
  return `${BASE_URL}/accounts/${accountId}/banks`;
};

export const postRegisterApiUrl = BASE_URL + "/signup";

export const getUserDataApi = BASE_URL + "/accounts/";

export const getBussinessCategoryApiUrl = BASE_URL + "/businessCategory";

export const putModifyAccountApi = (accountId) => {
  return `${BASE_URL}/accounts/${accountId}`;
};

export const postBankAccountApi = (accountId) => {
  return `${BASE_URL}/accounts/${accountId}/banks`;
};

export const putBankAccountApi = (accountId, bankId) => {
  return `${BASE_URL}/accounts/${accountId}/banks/${bankId}`;
};

export const uploadKybDocumentApi = (accountId) => {
  return `${BASE_URL}/accounts/${accountId}/documents`;
};

export const deleteKybDocumentApi = (accountId, documentId) => {
  return `${BASE_URL}/accounts/${accountId}/documents/${documentId}`;
};

export const downloadKybDocumentApi = (accountId, documentId) => {
  return `${BASE_URL}/accounts/${accountId}/documents/${documentId}`;
};

export const uploadKycDocumentApi = (accountId, ownerId) => {
  return `${BASE_URL}/accounts/${accountId}/owners/${ownerId}/document`;
};

export const downloadKycDocumentApi = (accountId, documentId, ownerId) => {
  return `${BASE_URL}/accounts/${accountId}/owners/${ownerId}/documents/${documentId}`;
};

export const deleteKycDocumentApi = (accountId, documentId, ownerId) => {
  return `${BASE_URL}/accounts/${accountId}/owners/${ownerId}/documents/${documentId}`;
};

export const getAllAccountsApi = (accountId,count,from,skip,to) => {
  return `${BASE_URL}/accounts/${accountId}/users?count=${count}&from=${from}&skip=${skip}&to=${to}`
}
export const postAddUserWithRoleApi = (accountId)=>{
  return `${BASE_URL}/accounts/${accountId}/users`
}
export const putUpdateUserApi = (accountId,userId) =>{
  return `${BASE_URL}/accounts/${accountId}/users/${userId}`
}
export const deleteUserApi = (accountId,userId)=>{
  return `${BASE_URL}/accounts/${accountId}/users/${userId}`
}