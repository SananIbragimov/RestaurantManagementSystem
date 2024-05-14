import * as Yup from "yup";

export const reservationSchema = Yup.object().shape({
  tableId: Yup.number()
    .moreThan(0, "TableId must be greater than 0.")
    .required("TableId is required."),
  customerName: Yup.string()
    .min(2, "Customer name must be between 2 and 50 characters.")
    .max(50, "Customer name must be between 2 and 50 characters.")
    .required("Customer name is required."),
  customerPhone: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Customer phone is not a valid international phone number."
    )
    .required("Customer phone is required."),
  reservationTime: Yup.date().required("Reservation time is required."),
  validFromTime: Yup.string().required("Time is required."),
});
