import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../../../components/ui/use-toast";
import { ApiError, IInputProps } from "../../../types";
import FormFields from "../../../components/FormFields";
import { createUser, editUser } from "../../../services/userApis";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .optional(),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .optional(),

    role: z
      .enum(["admin", "mechanical"])
      .refine((value) => ["admin", "mechanical"].includes(value), {
        message: "Role must be 'admin' or 'mechanical'",
      }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

type UserFormValue = z.infer<typeof formSchema>;

interface MyInputProps extends IInputProps {
  name: keyof UserFormValue;
}

const inputs: MyInputProps[] = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Enter your name...",
  },
  {
    type: "select",
    name: "role",
    label: "Role",
    placeholder: "Select your role...",
    values: [
      { value: "admin", label: "Admin" },
      { value: "mechanical", label: "Mechanical" },
    ],
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter your email address...",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    hideOnEdit: true,
  },
  {
    type: "password",
    name: "passwordConfirm",
    label: "Confirm Password",
    placeholder: "Confirm your password...",
    hideOnEdit: true,
  },
];

interface UserFormProps {
  isEdit: boolean;
  defaultValues?: UserFormValue;
}

const UserForm: React.FC<UserFormProps> = ({
  isEdit,
  defaultValues = {
    email: "",
    name: "",
    role: "mechanical",
    password: "",
    passwordConfirm: "",
  },
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const nav = useNavigate();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setFormError("");

    try {
      if (isEdit) {
        await editUser(data, id || "");
        toast({
          title: "Success",
          description: "User successfully updated",
        });
        nav("/dashboard/users");
      } else {
        await createUser(data);
        toast({
          title: "Success",
          description: "User successfully created",
        });
        nav("/dashboard/users");
      }
    } catch (error) {
      const typedError = error as AxiosError<{ errors: ApiError[] }>;
      console.log(typedError);
      typedError.response?.data.errors.map(({ param, msg }: ApiError) => {
        form.setError(param as keyof UserFormValue, {
          type: "manual",
          message: msg,
        });
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid w-full gap-2 mb-4 sm:grid-cols-2">
            <FormFields<UserFormValue>
              inputs={inputs}
              form={form}
              loading={loading}
              isEdit={isEdit}
            />
          </div>
          {formError && (
            <div className="mb-2 text-sm text-red-500">{formError}</div>
          )}
          <Button
            disabled={loading}
            size={"lg"}
            className="block mx-auto w-fit"
            type="submit"
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
