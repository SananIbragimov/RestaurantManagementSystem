import * as Yup from "yup";

export const tableSchema = Yup.object().shape({
  name: Yup.string()
    .required("Table name is required.")
    .min(2, "Table name must be between 2 and 30 characters.")
    .max(30, "Table name must be between 2 and 30 characters."),
  capacity: Yup.number()
    .required("Capacity is required.")
    .moreThan(0, "Capacity must be greater than 0."),
  isReserved: Yup.boolean(),
  reservationTime: Yup.date()
  .nullable()
  .when("isReserved", (isReserved, schema) => 
      isReserved ? schema.required("Reservation time is required when the table is reserved.")
      : schema
  ),

  validFromTime: Yup.string()
    .nullable()
    .when("isReserved", (isReserved, schema) => 
      isReserved ? schema.required("Valid from time is required when reservation time is set.") : schema
    ),
  tableStatus: Yup.number()
    .required("Table status is required.")
    .oneOf([1, 2, 3], "Invalid table status."),
});
