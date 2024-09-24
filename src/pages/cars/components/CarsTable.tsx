import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { ICar } from "../../../types";
import { Skeleton } from "../../../components/ui/skeleton";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { toast } from "../../../components/ui/use-toast";
import { useState } from "react";
import ImageCell from "../../../components/ImageCell";
import { deleteCar } from "../../../services/carApis";
interface ICarsTableProps {
  cars: ICar[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
const CarsTable: React.FC<ICarsTableProps> = ({
  error,
  isLoading,
  cars,
  refetch,
}) => {
  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Plate number</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Employee who added it</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="w-24"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {error && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-red-500">
                {error.message}
              </TableCell>
            </TableRow>
          )}
          {isLoading &&
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={"skeleton" + i}>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-full p-2 rounded-xl" />
                </TableCell>
              </TableRow>
            ))}
          {!isLoading &&
            cars.map((car) => (
              <CarRow refetch={refetch} key={car?._id} car={car} />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CarsTable;

const CarRow: React.FC<{ car: ICar; refetch: () => void }> = ({
  car,
  refetch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      await deleteCar(car?._id);
      toast({
        title: "Success",
        description: "Car successfully deleted",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsOpen(false);
      setIsLoading(false);
      refetch();
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{car?.name}</TableCell>
        <TableCell>{car?.model}</TableCell>
        <TableCell>{car?.number}</TableCell>
        <TableCell>{car?.color}</TableCell>
        <TableCell>{car?.year}</TableCell>
        <TableCell>
          {car?.creator.email} - {car?.creator.name}
        </TableCell>

        <TableCell>
          <ImageCell url={car?.image} />
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant="outline">
                <BsThreeDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel asChild>
                <Link
                  to={`/dashboard/cars/${car?._id}`}
                  className="flex items-center gap-2"
                >
                  <CiEdit size={18} />
                  Edit
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuLabel asChild>
                <Link
                  to={`/dashboard/reports/${car?._id}`}
                  className="flex items-center gap-2"
                >
                  <CiEdit size={18} />
                   Reports
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
        {sessionStorage.getItem("role") === "admin" ?       <DropdownMenuLabel>
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <AiFillDelete size={18} />
                  Delete
                </button>
              </DropdownMenuLabel>: null}
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isOpen}>
            <AlertDialogTrigger></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. It will permanently delete the
                  car and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={isLoading}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction disabled={isLoading} onClick={deleteHandler}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    </>
  );
};
