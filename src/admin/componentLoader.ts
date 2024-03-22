import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  OrderItemForm: componentLoader.add(
    "OrderItemForm",
    "./components/order-item-form.tsx"
  ),
};

export { componentLoader, Components };
