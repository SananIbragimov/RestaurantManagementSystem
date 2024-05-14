import * as Yup from "yup";

const orderItemSchema = Yup.object().shape({
  orderId: Yup.number()
    .moreThan(0, "Valid Order Id is required.")
    .required("Order Id is required."),

  productId: Yup.number()
    .moreThan(0, "Valid Product Id is required.")
    .required("Product Id is required."),

  quantity: Yup.number()
    .moreThan(0, "Valid Quantity is required.")
    .required("Quantity is required."),
});

export default orderItemSchema;
