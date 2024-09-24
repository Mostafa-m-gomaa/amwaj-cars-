import BreadCrumb from "../../components/BreadCrumb";
import { Heading } from "../../components/Heading";
import { useParams } from "react-router-dom";
import { Separator } from "../../components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { ICar } from "../../types";
import CarForm from "./components/CarForm";
import { getAllCarsWithParams } from "../../services/carApis";

export default function CarFormPage() {
  const { id } = useParams();
  const isEdit = id !== "new";
  const breadcrumbItems = [
    { title: "Cars", link: "/dashboard/cars" },
    {
      title: isEdit ? "Edit" : "Create",
      link: `/dashboard/cars/${id}`,
    },
  ];

  // isLoading, error,
  const { data } = useQuery({
    enabled: isEdit,
    queryKey: ["cars", id],
    queryFn: async () => {
      const response = await getAllCarsWithParams(`/${id}`);
      return response.data as ICar;
    },
  });
  return (
    <>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={isEdit ? "Edit Car" : "Create Car"}
            description={isEdit ? "Edit car details" : "Create a new car"}
          />
        </div>
        <Separator />
        {data && isEdit && (
          <CarForm
            isEdit={isEdit}
            defaultValues={{
              name: data.name,
              model: data.model,
              number: data.number,
              color: data.color,
              year: data.year,
            }}
          />
        )}
        {!isEdit && (
          <CarForm
            isEdit={isEdit}
            defaultValues={{
              name: "",
              model: "",
              number: "",
              color: "",
              year: "",
            }}
          />
        )}
      </div>
    </>
  );
}
