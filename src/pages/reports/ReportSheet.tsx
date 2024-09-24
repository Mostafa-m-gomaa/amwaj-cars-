import { Button } from "../../components/ui/button";
import { Report } from "../../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { DialogDemo } from "./PopOver";
import { useEffect ,useState } from "react";

interface ReportProps {
  report: Report;
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

export const ReportSheet = ({ report, refresh, setRefresh }: ReportProps) => {
  const [general, setGeneral] = useState(0);
  useEffect(()=>{
console.log(report)
if(report.WindshieldStatus.length > 0 && report.brakesStatus.length > 0 && report.airConditioning.length > 0 && report.brushesStatus.length > 0 && report.cleanlinessStatus.length > 0 && report.engineStatus.length > 0 && report.externalStatus.length > 0 && report.internalStatus.length > 0 && report.lampsStatus.length > 0 && report.mechanicalStatus.length > 0 && report.paintStatus.length > 0 && report.wheelStatus.length > 0 ){
  
setGeneral(report.WindshieldStatus[0].rate + report.brakesStatus[0].rate +report.airConditioning[0].rate+report.brushesStatus[0].rate+report.cleanlinessStatus[0].rate+report.engineStatus[0].rate+report.externalStatus[0].rate+report.internalStatus[0].rate+report.lampsStatus[0].rate+report.mechanicalStatus[0].rate+report.paintStatus[0].rate+report.wheelStatus[0].rate)
}
  },[])
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-fit">Open</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Report Details</SheetTitle>
          {general > 0  ? <SheetTitle>General Rate {general / 10} / 12</SheetTitle>: null}
        </SheetHeader>
        <div className="flex flex-col gap-2 p-4 my-3 bg-gray-400 rounded-md">
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> Wind shield Status</div>
            {report.WindshieldStatus.length > 0 ? (
              <div>
                <div>rate : {report.WindshieldStatus[0].rate} / 10</div>
                <div>review : {report.WindshieldStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="WindshieldStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> brakes Status</div>
            {report.brakesStatus.length > 0 ? (
              <div>
                <div>rate : {report.brakesStatus[0].rate} / 10</div>
                <div>review : {report.brakesStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="brakesStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize">air Conditioning</div>
            {report.airConditioning.length > 0 ? (
              <div>
                <div>rate : {report.airConditioning[0].rate} / 10</div>
                <div>review : {report.airConditioning[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="airConditioning"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> brushes Status</div>
            {report.brushesStatus.length > 0 ? (
              <div>
                <div>rate : {report.brushesStatus[0].rate} / 10</div>
                <div>review : {report.brushesStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="brushesStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> clean lines Status</div>
            {report.cleanlinessStatus.length > 0 ? (
              <div>
                <div>rate : {report.cleanlinessStatus[0].rate} / 10</div>
                <div>review : {report.cleanlinessStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="cleanlinessStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> engine Status</div>
            {report.engineStatus.length > 0 ? (
              <div>
                <div>rate : {report.engineStatus[0].rate} / 10</div>
                <div>review : {report.engineStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="engineStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize">external Status</div>
            {report.externalStatus.length > 0 ? (
              <div>
                <div>rate : {report.externalStatus[0].rate} / 10</div>
                <div>review : {report.externalStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="externalStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize">internal Status</div>
            {report.internalStatus.length > 0 ? (
              <div>
                <div>rate : {report.internalStatus[0].rate} / 10</div>
                <div>review : {report.internalStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="internalStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> lamps Status</div>
            {report.lampsStatus.length > 0 ? (
              <div>
                <div>rate : {report.lampsStatus[0].rate} / 10</div>
                <div>review : {report.lampsStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="lampsStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> mechanical Status</div>
            {report.mechanicalStatus.length > 0 ? (
              <div>
                <div>rate : {report.mechanicalStatus[0].rate} / 10</div>
                <div>review : {report.mechanicalStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="mechanicalStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize">paint Status</div>
            {report.paintStatus.length > 0 ? (
              <div>
                <div>rate : {report.paintStatus[0].rate} / 10</div>
                <div>review : {report.paintStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="paintStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}

          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> wheel Status</div>
            {report.wheelStatus.length > 0 ? (
              <div>
                <div>rate : {report.wheelStatus[0].rate} / 10</div>
                <div>review : {report.wheelStatus[0].review}</div>
              </div>
            ) : (
              <DialogDemo
                field="wheelStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> meter Status</div>
            {report.meterStatus.length > 0 ? (
              <div>
                <div>Meter Reading : {report.meterStatus[0].meterReading} </div>
              </div>
            ) : (
              <DialogDemo
                field="meterStatus"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
          <div className="flex flex-col gap-3 p-4 bg-white rounded-md">
            <div className="font-bold capitalize"> drivers</div>
            {report.drivers.length > 0 ? (
              <div>
                <div>Company Name: {report.drivers[0].companyName} </div>
                <div>Driver Name: {report.drivers[0].driverName} </div>
                <div>Reciption Date: {report.drivers[0].ReceptionDate} </div>
                <div>Delivery Date: {report.drivers[0].DeliveryDate} </div>
              </div>
            ) : (
              <DialogDemo
                field="drivers"
                setRefresh={setRefresh}
                refresh={refresh}
                id={report._id}
              />
            )}
          </div>
          {/* end of the div */}
        </div>
      </SheetContent>
    </Sheet>
  );
};
