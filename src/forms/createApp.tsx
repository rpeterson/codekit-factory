import { z } from "zod";
import { FormBuilder } from "./builder";

const fields = [
  {
    label: "Name",
    name: "name",
    type: "string",
  },
  {
    label: "Subdomain",
    name: "subdomain",
    type: "string",
    validate: (value) => {
     // TODO: check availability of subdomain
    },
  },
  {
    label: "Domain",
    name: "domain",
    type: "string",
    validate: (value) => {
     // TODO: ensure is subdomain that is supported
    },
  }
];

const initialValues = {
  name: "",
  subdomain: "",
  domain: "codekits.io"
};

const validationSchema = z.object({
  name: z.string().min(10, "App name must be contain at least 10 characters"),
  subdomain: z.string().min(8, "Subdomain must contain at least 6 characters"),
  domain: z.enum(["codekits.io", "appspaces.io"])
});

export function CreateAppForm({ onSubmit }: { onSubmit: (values: any) => void}) {
  return (
    <FormBuilder
      fields={fields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
}
