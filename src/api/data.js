import fetch from './fetch';

export const getTableData = () => {
  return fetch({
    url: 'get_table_data',
    method: 'get',
  });
};

export const getDragList = () => {
  return fetch({
    url: 'get_drag_list',
    method: 'get',
  });
};

export const errorReq = () => {
  return fetch({
    url: 'error_url',
    method: 'post',
  });
};

export const saveErrorLogger = (info) => {
  return fetch({
    url: 'save_error_logger',
    data: info,
    method: 'post',
  });
};

export const uploadImg = (formData) => {
  return fetch({
    url: 'image/upload',
    data: formData,
  });
};

export const getOrgData = () => {
  return fetch({
    url: 'get_org_data',
    method: 'get',
  });
};

export const getTreeSelectData = () => {
  return fetch({
    url: 'get_tree_select_data',
    method: 'get',
  });
};
