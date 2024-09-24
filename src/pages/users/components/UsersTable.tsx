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
import { IUser } from "../../../types";
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
import { axiosInstance } from "../../../services/axios.config";
import { deleteUser } from "../../../services/userApis";

interface IUsersTableProps {
  users: IUser[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  withActions?: boolean;
}

const UsersTable: React.FC<IUsersTableProps> = ({
  error,
  isLoading,
  users,
  refetch,
  withActions,
}) => {
  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
           
            {withActions && <TableHead className="w-24"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {error && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-500">
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
              </TableRow>
            ))}
          {!isLoading &&
            users.map((user) => (
              <UserRow
                refetch={refetch}
                withActions={withActions}
                key={user._id}
                user={user}
              />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;

const UserRow: React.FC<{
  user: IUser;
  refetch: () => void;
  withActions?: boolean;
}> = ({ user, withActions, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggleActive, setIsToggleActive] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      await deleteUser(user._id);
      toast({
        title: "Success",
        description: "User successfully deleted",
      });
    } catch (err) {
      toast({
        title: "Failed",
        description: "Something went wrong",
      });
    } finally {
      setIsOpen(false);
      setIsLoading(false);
      refetch();
    }
  };
  const toggleActive = async () => {
    setIsLoading(true);
    try {
      if (user.active) {
        await axiosInstance.delete(`/users/active/${user._id}`);
        toast({
          title: "Success",
          description: "User deactivated successfully",
        });
      } else {
        await axiosInstance.put(`/users/active/${user._id}`);
        toast({
          title: "Success",
          description: "User activated successfully",
        });
      }
      refetch();
      setIsToggleActive(false);
    } catch (err) {
      toast({
        title: "Failed",
        description: "Something went wrong",
      });
      console.log(err);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>

        {withActions && (
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
                    to={`/dashboard/users/${user._id}`}
                    className="flex items-center gap-2"
                  >
                    <CiEdit size={18} />
                    Edit
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className="flex items-center justify-center gap-2"
                  >
                    <AiFillDelete size={18} />
                    Delete
                  </button>
                </DropdownMenuLabel>{" "}
             
         
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={isOpen}>
              <AlertDialogTrigger></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The user will be permanently
                    deleted and their data removed from our servers.
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
                  <AlertDialogAction
                    disabled={isLoading}
                    onClick={deleteHandler}
                  >
                    Proceed
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>{" "}
            <AlertDialog open={isToggleActive}>
              <AlertDialogTrigger></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {user.active ? "Deactivate user" : "Activate user"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {user.active
                      ? "This will deactivate user"
                      : "This will activate user"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    disabled={isLoading}
                    onClick={() => {
                      setIsToggleActive(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isLoading}
                    onClick={toggleActive}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        )}
      </TableRow>
    </>
  );
};
