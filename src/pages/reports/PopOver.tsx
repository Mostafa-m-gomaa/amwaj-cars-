import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  addDriver,
  addFeature,
  addMeter,
  DRate,
  MRate,
} from "../../services/carApis";
import { IRate } from "../../services/carApis";
import { toast } from "../../components/ui/use-toast";

interface FeaturetProps {
  field: string;
  setRefresh: (value: boolean) => void;
  refresh: boolean;
  id: string;
}

export const DialogDemo: React.FC<FeaturetProps> = ({
  field,
  setRefresh,
  refresh,
  id,
}) => {
  const [rate, setRate] = useState(0);
  const [rev, setRev] = useState("");
  const [meter, setMeter] = useState("");
  const [company, setCompany] = useState("");
  const [driver, setDriver] = useState("");
  const [recDate, setRecDate] = useState("");
  const [delDate, setDelDate] = useState("");

  const handleSumit = () => {
    if (meter !== "") {
      const meterObj: MRate = {
        meterReading: meter,
      };
      addMeter(String(id), field, meterObj).then((res) => {
        console.log(res.data);

        if (res.data.message === "rate has been added to report successfully") {
          setRefresh(!refresh);
          toast({
            title: "Success",
            description: " successfull process",
          });
          window.location.reload();
        }
      });
    } else if (field === "drivers") {
      const driverObj: DRate = {
        companyName: company,
        driverName: driver,
        ReceptionDate: recDate,
        DeliveryDate: delDate,
      };
      addDriver(String(id), field, driverObj).then((res) => {
        console.log(res.data);

        if (res.data.message === "rate has been added to report successfully") {
          setRefresh(!refresh);
          toast({
            title: "Success",
            description: " successfull process",
          });
          window.location.reload();
        }
      });
    } else {
      const obj: IRate = {
        rate: rate,
        review: rev,
      };
      addFeature(String(id), field, obj).then((res) => {
        console.log(res.data);

        if (res.data.message === "rate has been added to report successfully") {
          setRefresh(!refresh);
          toast({
            title: "Success",
            description: " successfull process",
          });
          window.location.reload();
        }
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      {field !== "meterStatus" && field !== "drivers" ? (
        <DialogContent className="sm:max-w-[425px] ">
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Rate of 10
              </Label>
              <Input
                type="number"
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Review
              </Label>
              <Input
                onChange={(e) => setRev(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSumit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      ) : null}
      {field === "meterStatus" ? (
        <DialogContent className="sm:max-w-[425px] ">
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Meter readeing
              </Label>
              <Input
                onChange={(e) => setMeter(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSumit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      ) : null}
      {field === "drivers" ? (
        <DialogContent className="sm:max-w-[425px] ">
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Company Name
              </Label>
              <Input
                onChange={(e) => setCompany(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Driver Name
              </Label>
              <Input
                onChange={(e) => setDriver(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Reception Date
              </Label>
              <Input
                onChange={(e) => setRecDate(e.target.value)}
                className="col-span-3"
                type="date"
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Delivery Date
              </Label>
              <Input
                onChange={(e) => setDelDate(e.target.value)}
                className="col-span-3"
                type="date"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSumit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};
