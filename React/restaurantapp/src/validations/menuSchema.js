import * as Yup from "yup";

export const menuSchema = Yup.object().shape({
  name: Yup.string()
    .required("Menu name is required.")
    .min(2, "Menu name must be between 2 and 50 characters.")
    .max(50, "Menu name must be between 2 and 50 characters."),
  validFrom: Yup.date().required("Valid From date is required"),
  validFromTime: Yup.string().nullable(),
  validTo: Yup.date()
    .nullable()
    .when("validFrom", (validFrom, schema) =>
      validFrom
        ? schema.min(
            Yup.ref("validFrom"),
            "Valid To date must be greater than Valid From date."
          )
        : schema
    ),
  validToTime: Yup.string().nullable(),
});
