import { Button } from "../../../components/ui/button";
import { Form, FormItem, FormLabel } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";

import { ApiError, IInputProps } from "../../../types";

import { AiFillDelete } from "react-icons/ai";
import FormFields from "../../../components/FormFields";
import { AxiosError } from "axios";
import { FaStar } from "react-icons/fa6";
import { toast } from "../../../components/ui/use-toast";
import { createCar, editCar } from "../../../services/carApis";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  model: z.string().min(1).max(255),
  number: z.string().min(1).max(255),
  color: z.string().min(1).max(255),
  year: z.string().min(1).max(255),
});

type CarFormValue = z.infer<typeof formSchema>;
interface MyInputProps extends IInputProps {
  name: keyof CarFormValue;
}

interface CarFormProps {
  isEdit: boolean;
  defaultValues?: CarFormValue;
}
const CarForm: React.FC<CarFormProps> = ({
  isEdit,
  defaultValues = {
    name: "",
    model: "",
    number: "",
    color: "",
    year: "2022",
  },
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [imageCover, setImageCover] = useState<File | null>(null);
  const nav = useNavigate();
  const form = useForm<CarFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const inputs: MyInputProps[] = useMemo(() => {
    return [
      {
        type: "text",
        label: "Name",
        placeholder: "Enter car name",
        name: "name",
      },
      {
        type: "text",
        label: "Model",
        placeholder: "Enter car model",
        name: "model",
      },
      {
        type: "text",
        label: "Plate number",
        placeholder: "Enter car plate number",
        name: "number",
      },
      {
        type: "text",
        label: "Color",
        placeholder: "Enter car color",
        name: "color",
      },
      {
        type: "text",
        label: "Year",
        placeholder: "Enter car year",
        name: "year",
      },
    ];
  }, []);
  const onSubmit = async (data: CarFormValue) => {
    setLoading(true);
    setFormError("");
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (imageCover) {
      formData.append("image", imageCover);
    }

    try {
      if (isEdit) {
        await editCar(formData, id || "");
        toast({
          title: "Success",
          description: "Car successfully updated",
        });
        nav("/dashboard/cars");
      } else {
        await createCar(formData);
        toast({
          title: "Success",
          description: "Car successfully created",
        });
        nav("/dashboard/cars");
      }
    } catch (error) {
      const typedError = error as AxiosError<{ errors: ApiError[] }>;
      typedError.response?.data.errors.map(({ param, msg }: ApiError) => {
        form.setError(param as keyof CarFormValue, {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="relative flex items-center justify-center h-40 mb-10 overflow-hidden rounded-xl">
                <span className="absolute text-primary top-2 left-2">
                  <FaStar />
                </span>
                <img
                  src={
                    imageCover
                      ? URL.createObjectURL(imageCover)
                      : "https://via.placeholder.com/150"
                  }
                  alt="profile"
                  className="h-40 "
                />
                {imageCover && (
                  <button
                    disabled={loading}
                    className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-destructive text-background"
                    onClick={() => setImageCover(null)}
                  >
                    <AiFillDelete />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="grid w-full gap-2 mb-4 sm:grid-cols-2">
            <FormItem>
              <FormLabel htmlFor="name">Cover image:</FormLabel>
              <Input
                type="file"
                className="text-foreground"
                disabled={loading}
                required={!isEdit}
                onChange={(e) => {
                  if (e.target.files) {
                    setImageCover(e.target.files[0]);
                  }
                }}
              />
            </FormItem>

            <FormFields<CarFormValue>
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
export default CarForm;
