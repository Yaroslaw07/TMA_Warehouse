import {
  FormGroup,
  Box,
  Label,
  Input,
  Header,
  Select,
  Button,
} from "@adminjs/design-system";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { ApiClient, BasePropertyProps, useNotice } from "adminjs";
import { unit_of_measurement } from "@prisma/client";

const OrderItemForm = ({ record }: BasePropertyProps) => {
  const navigate = useNavigate();

  const addNotice = useNotice();
  const api = new ApiClient();

  const [unitOfMeasurement, setUnitOfMeasurement] =
    useState<unit_of_measurement>();

  const quantityRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const unitsArray = Object.keys(unit_of_measurement).map((key) => {
    return { value: key, label: key };
  });

  useEffect(() => {
    setUnitOfMeasurement(
      record?.params.unit_of_measurement as unit_of_measurement
    );
  }, [record]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const quantity = quantityRef.current?.value;
    const price = priceRef.current?.value;
    const comment = commentRef.current?.value;

    const item = {
      quantity: quantity ? parseFloat(quantity) : undefined,
      price: price ? parseFloat(price) : undefined,
      comment,
      unit_of_measurement: unitOfMeasurement,
      itemId: record?.id,
    };

    console.log(item);

    if (
      !item.quantity ||
      item.quantity == 0 ||
      !item.price ||
      item.price == 0
    ) {
      addNotice({
        message: "Quantity and price must be filled",
        type: "error",
      });
      return;
    }

    const response = await api.resourceAction({
      resourceId: "request",
      actionName: "new",
      data: item,
    });

    if (response.status !== 200) {
      addNotice({
        message: "Error",
        type: "Something went wrong",
      });
      return;
    } else {
      addNotice({
        message: "Request added",
        type: "success",
      });
      navigate(
        "/admin/resources/request/records/" + response.data.record.id + "/show"
      );
    }

    console.log(response);
  };

  return (
    <Box variant="white" boxShadow="card">
      <Header>Order item</Header>
      <FormGroup
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        id="form"
      >
        <Box>
          <Label required htmlFor="unit_of_measurement">
            Unit Of Measurement
          </Label>
          <Select
            value={{ value: unitOfMeasurement, label: unitOfMeasurement }}
            id="unit_of_measurement"
            onChange={(selected) =>
              setUnitOfMeasurement(selected.value as unit_of_measurement)
            }
            options={unitsArray}
          ></Select>
        </Box>

        <Box>
          <Label required htmlFor="quantity">
            Quantity
          </Label>
          <Input type="number" id="quantity" ref={quantityRef}></Input>
        </Box>

        <Box>
          <Label required htmlFor="price">
            Price
          </Label>
          <Input type="number" id="price" ref={priceRef}></Input>
        </Box>

        <Box>
          <Label htmlFor="comment">Comment</Label>
          <textarea id="comment" ref={commentRef}></textarea>
        </Box>

        <Box>
          <Button onClick={handleSubmit} variant="primary">
            Add item
          </Button>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
};

export default OrderItemForm;
