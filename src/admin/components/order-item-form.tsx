import {
  FormGroup,
  Box,
  Label,
  Input,
  Header,
  Select,
  MessageBox,
} from "@adminjs/design-system";
import React, { useState } from "react";
import { BasePropertyProps } from "adminjs";
import { request_status, unit_of_measurement } from "@prisma/client";

const OrderItemForm = ({ record }: BasePropertyProps) => {
  const [unitOfMeasurement, setUnitOfMeasurement] =
    useState<unit_of_measurement>(
      record?.params.unit_of_measurement as unit_of_measurement
    );

  const unitsArray = Object.keys(unit_of_measurement).map((key) => {
    return { value: key, label: key };
  });

  return (
    <Box variant="white" boxShadow="card">
      <Header>Add item to requests</Header>
      <FormGroup
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <Box>
          <Label required htmlFor="unit_of_measurement">
            Unit Of Measurement
          </Label>
          <Select
            value={unitOfMeasurement}
            id="unit_of_measurement"
            onChange={(selected) => setUnitOfMeasurement(selected)}
            options={unitsArray}
          ></Select>
        </Box>

        <Box>
          <Label required htmlFor="quantity">
            Quantity
          </Label>
          <Input type="number" id="quantity"></Input>
        </Box>

        <Box>
          <Label required htmlFor="price">
            Price
          </Label>
          <Input type="number" id="price"></Input>
        </Box>

        <Box>
          <Label htmlFor="comment">Comment</Label>
          <textarea id="comment"></textarea>
        </Box>
      </FormGroup>
    </Box>
  );
};

export default OrderItemForm;
