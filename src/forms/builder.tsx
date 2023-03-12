import React from "react";
import {
  useFormik,
  Field,
  type FormikValues,
  type FormikErrors,
  type FormikContextType,
  FormikProvider,
} from "formik";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import type * as z from "zod";

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "checkbox" | "number";
  validate?: (value: any) => string | undefined;
}

interface ValidationSchema {
  [field: string]: z.ZodType<any, any>;
}

interface FormBuilderProps {
  fields: FormField[];
  initialValues: FormikValues;
  onSubmit: (values: FormikValues) => void;
  validationSchema?: z.ZodObject<ValidationSchema>;
}

export function createFormField({
  label,
  name,
  type,
  validate,
  formik,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "checkbox" | "number";
  validate?: (value: any) => string | undefined;
  formik: Pick<
    FormikContextType<FormikValues>,
    "values" | "handleChange" | "handleBlur" | "touched" | "errors"
  >;
}) {
  return (
    <FormControl
      isInvalid={!!formik.errors[name] && formik.touched[name]}
      key={name}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field
        as={type === "checkbox" ? Checkbox : Input}
        id={name}
        name={name}
        type={type}
        variant="filled"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        validate={validate}
      />
      <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>
    </FormControl>
  );
}

export function FormBuilder({
  fields,
  initialValues,
  onSubmit,
  validationSchema,
}: FormBuilderProps) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: (values: typeof initialValues) => {
      try {
        validationSchema?.parse(values);
        console.log("VALIDATED", values);
      } catch (error) {
        console.log("ERRORS", error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return error.formErrors.fieldErrors as FormikErrors<FormikValues>;
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}>
        <VStack spacing={4} align="flex-start">
          {fields.map((field) => createFormField({ ...field, formik }))}
          <Button type="submit" colorScheme="purple" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
}
