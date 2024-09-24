import BreadCrumb from "../../components/BreadCrumb";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Heading } from "../../components/Heading";
import { Report } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "../../components/ui/use-toast";
import { addReport, getReports } from "../../services/carApis";
import { ReportSheet } from "./ReportSheet";

const AddReport = () => {
  const breadcrumbItems = [{ title: "Cars", link: "/dashboard/cars" }];
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const param = useParams().id;
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getReports(String(param)).then((res) => {
      console.log(res);
      if (res.data) {
        setReports(res.data);
      }
    });
  }, [refresh]);

  const onSubmit = async () => {
    console.log(description);
    setLoading(true);

    try {
      await addReport(String(param), description).then((res) => {
        if (res.data.data) {
          setIsOpen(false);
          setRefresh(!refresh);
          toast({
            title: "Success",
            description: "Report successfully created",
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Car Reports`} description="Manage car reports" />

        {/* start dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-3">
              Add report <Plus className="w-4 h-4 mr-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add report </DialogTitle>
              <DialogDescription>
                Enter Description for this report
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="name" className="text-right">
                  Description
                </Label>
                <Input
                  className="col-span-3"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={loading} onClick={onSubmit}>
                Add +
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* end dialog */}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {reports.map((report: Report, index) => {
          const dateStr = report.createdAt;
          const date = new Date(dateStr);
          const readableDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long", 
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true, 
          });
          return (
            <div
              className="flex flex-col text-center border-[1px] gap-2 p-2 rounded-sm"
              key={index}
            >
              <div>{report.desc}</div>
              <div>Created At : {readableDate}</div>
              <div>By : {report?.maintainer?.email}</div>
              <div className="flex justify-center gap-6">
                <ReportSheet
                  report={report}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
                {sessionStorage.getItem("role") === "admin"  ?    <Button variant="destructive">Delete</Button>: null}
             
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddReport;
