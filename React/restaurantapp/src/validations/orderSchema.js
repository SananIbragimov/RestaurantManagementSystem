import * as Yup from "yup";

const orderSchema = Yup.object().shape({
  tableId: Yup.number()
    .moreThan(0, "Valid Table Id is required.")
    .required("Table Id is required."),

  appUserId: Yup.string()
    .required("App User Id is required.")
    .min(1, "App User Id must be at least 1 character long.")
    .max(128, "App User Id must be at most 128 characters long."),
});

export default orderSchema;
