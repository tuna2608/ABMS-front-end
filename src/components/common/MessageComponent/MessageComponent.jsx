import { message } from "antd";

const success = (mes = 'success') => {
  message.success(mes)
};
const error = (mes = 'failed') => {
  message.error(mes)
};
const warning = (mes = 'warning') => {
  message.warning(mes)
};

export {success,error,warning}