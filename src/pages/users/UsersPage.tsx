import { Plus } from "lucide-react";
import BreadCrumb from "../../components/BreadCrumb";
import { Heading } from "../../components/Heading";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import UsersTable from "./components/UsersTable";
import { useState } from "react";
import { IPagination, IUser } from "../../types";
import PaginationHandler from "../../components/PaginationHandler";
import useDebouncing from "../../hooks/useDebouncing";
import { Input } from "../../components/ui/input";
import { getAllUsersWithParams } from "../../services/userApis";
const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];

export default function UsersPage() {
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    limit: 50,
    numberOfPages: 1,
    results: 0,
  });
  const [search, setSearch] = useState<string>("");
  const { isLoading, error, data, refetch, isRefetching } = useQuery({
    queryKey: ["users", `page=${pagination.currentPage}`, search],
    queryFn: async () => {
      const response = await getAllUsersWithParams(
        `?page=${pagination.currentPage}${
          search === "" ? "" : `&keyword=${search}`
        }`
      );
      setPagination((prev) => ({
        ...prev,
        numberOfPages: response.paginationResult.numberOfPages,
        results: response.results,
      }));
      return response.data as IUser[];
    },
  });
  const debouncedSearch = useDebouncing((value) => {
    setSearch(value as string);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, 1000);
  return (
    <>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${pagination.results})`}
            description="Manage users"
          />
          <Button asChild>
            <Link to={"/dashboard/users/new"}>
              <Plus className="w-4 h-4 mr-2" /> Add New
            </Link>
          </Button>
        </div>
        <Separator />
        <Input
          placeholder="User search"
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
        <Separator />
        <UsersTable
          users={data || []}
          isLoading={isLoading || isRefetching}
          error={error}
          withActions={true}
          refetch={refetch}
        />
        <PaginationHandler
          page={pagination.currentPage}
          totalPages={pagination.numberOfPages}
          onChange={(page) => {
            setPagination((prev) => ({ ...prev, currentPage: page }));
            refetch();
          }}
        />
      </div>
    </>
  );
}
