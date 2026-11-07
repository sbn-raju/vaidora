import React, { useState, useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import axios from "axios"

const DoctorTable = ({ data, columns }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const navigate = useNavigate();

  const query = useQueryClient();

  console.log(data, columns);

  const handleRowClick = (id) => {
    const isSelected = selectedItemIds.includes(id);
    const newSelectedItems = isSelected
      ? selectedItemIds.filter((itemId) => itemId !== id) // Deselect if already selected
      : [...selectedItemIds, id]; // Select if not selected
    setSelectedItemIds(newSelectedItems);
  };



  // const handel
  const markCompeltedAppointment = async (id) => {
    console.log(id);
    const response = await axios.put(
      `/api/v1/appointment/set-complete?id=${id}`
    );
    console.log(response);
    return response?.data;
  };

  const markCompletedMutation = useMutation({
    mutationFn: markCompeltedAppointment,
    onSuccess: async (data) => {
      console.log(data);
      toast.success(data.message);
      setSelectedItemIds([]);
      await query.invalidateQueries({
        queryKey: ["doctorCompletedAppointment"],
      });
      await query.invalidateQueries({ queryKey: ["doctorAppointment"] });
    },
    onError: async(error)=>{
      toast.error(error?.response.data.message);
    }
  });

  console.log(markCompletedMutation);

  const changeStatus = () => {
    if(selectedItemIds.length > 1){
      toast.error("Please select only one patient at a time to mark complete")
      return 
    }
    else if(selectedItemIds.length == 0){
      toast.error("Please select atleat one patient at a time to mark complete")
      return
    }
    console.log(selectedItemIds[0]);
    markCompletedMutation.mutate(selectedItemIds[0]);
  };

  const table = useReactTable({
    data,
    columns,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  const pageCount = table.getPageCount();
  const onPage = table.getState().pagination.pageIndex;


  // useEffect(() => {
  //   console.log(selectedItemIds);
  //   if(selectedItemIds.length > 1){
  //       toast.custom("Please select one member to mark complete")
  //   }
  // }, [selectedItemIds])
  

  return (
    <>
      <div className="mt-6 p-3 px-8 bg-white w-full rounded-2xl shadow-md flex justify-end">
        <div className="flex justify-center items-center">
          <button
            className="bg-green-600  text-white px-4 py-2 font-medium rounded-xl hover:bg-green-800"
            onClick={changeStatus}
          >
            <CloudDoneIcon />
            &nbsp;Mark Complete
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white rounded-xl mt-10">
        <thead className="border-b-2 border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b-2 border-gray-200 hover:cursor-pointer"
            >
              {headerGroup.headers.map((header) => (
                <th
                  className="p-4 text-left"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()]
                      }
                    </div>
                  )}
                  {header.column.getCanFilter() && (
                    <input
                      type="text"
                      value={
                        table
                          .getState()
                          .columnFilters.find(
                            (filter) => filter.id === header.column.id
                          )?.value ?? ""
                      }
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Filter By ${header.column.columnDef.header}`}
                      className="mt-2 p-1 border rounded w-full"
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.original.id}
              onClick={() => handleRowClick(row.original.id)}
              className="border-b-2 rounded-r-lg border-gray-200 even:bg-green-100 odd:bg-white "
              style={{
                backgroundColor: selectedItemIds.includes(row.original.id)
                //   (item) => item.id === row.original.id
                // )
                  ? "#b3d9ff"
                  : "",
                cursor: "pointer",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full my-6 shadow-md bg-white p-3 px-6 rounded-2xl flex justify-between">
        <button
          className="bg-green-500 text-white px-2 py-1 font-medium rounded-xl hover:bg-green-700"
          onClick={() => table.setPageIndex(0)}
        >
          <KeyboardDoubleArrowLeftIcon />
          &nbsp;First page
        </button>

        <button
          className="bg-red-500 text-white px-2 py-1 font-medium rounded-xl hover:bg-red-700"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <KeyboardArrowLeftIcon />
          &nbsp;Previous page
        </button>

        <div className=" w-1/3 flex flex-row justify-between">
          <div className="flex flex-row justify-center items-center">
            <p className="pr">Go to Page</p>
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? e.target.value - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border border-black rounded-md mr-2"
            />
          </div>
          <p className="mt-2">{`${onPage + 1} of ${pageCount} Pages`}</p>
          <div className="flex flex-row justify-center items-center">
            <p className="mr-2">Rows Per Page</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(e.target.value);
              }}
              className="border border-black p-1 rounded-md"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="bg-red-500 text-white px-2 py-1 font-medium rounded-xl hover:bg-red-700"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page&nbsp;
          <KeyboardArrowRightIcon />
        </button>
        <button
          className="bg-green-500 text-white px-2 py-1 font-medium rounded-xl hover:bg-green-700"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last page&nbsp;
          <KeyboardDoubleArrowRightIcon />
        </button>
      </div>
    </>
  );
};

export default DoctorTable;
