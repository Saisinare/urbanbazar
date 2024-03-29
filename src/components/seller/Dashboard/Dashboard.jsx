import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import jsCookie from "js-cookie";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [revenue, setrevenue] = useState("");
  const [totalOrders, settotalOrders] = useState(0);
  const [totalCustomer, settotalCustomer] = useState(0);
  const [years, setyears] = useState([]);
  const currentYear = new Date().getFullYear();
  const [yearValue, setyearValue] = useState(currentYear);
  const [yearlyStatistics, setyearlyStatistics] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const handleChange = (e) => {
    setyearValue(e.target.value);

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/seller/api/statistics/revenue/` + e.target.value+`?token=${jsCookie.get("token")}`,
        { withCredentials: true }
      )
      .then((res) => {
        let zeroRevenueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        res.data.yearlyMonthlyRevenue.forEach((element, index) => {
          zeroRevenueArray[element.month - 1] = element.totalRevenue;
        });
        setyearlyStatistics(zeroRevenueArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const yearsArray = [];

    for (let i = currentYear - 5; i <= currentYear; i++) {
      yearsArray.push(i);
    }

    setyears(yearsArray);

    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/seller/api/statistics?token=${jsCookie.get("token")}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.totalRevenue) {
          setrevenue(res.data.totalRevenue);
          settotalOrders(res.data.ordersCount);
          settotalCustomer(res.data.totalCustomers);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/seller/api/statistics/revenue/` + yearValue+`?token=${jsCookie.get("token")}`, {
        withCredentials: true,
      })
      .then((res) => {
        let zeroRevenueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        res.data.yearlyMonthlyRevenue.forEach((element, index) => {
          zeroRevenueArray[element.month - 1] = element.totalRevenue;
        });
        setyearlyStatistics(zeroRevenueArray);
      });
  }, []);

  return (
    <div className="w-full h-fit px-10  ">
      <div className=" h-fit md:h-40 w-full py-5 flex  gap-5 flex-col md:flex-row ">

        <div className=" h-26 md:h-full md:w-1/4  border rounded-xl flex overflow-hidden">
        <div className=" flex w-2/5 md:h-full h-26 rounded-xl md:bg-none  justify-center items-center">
            <div className=" text-green-600 text-2xl h-16 w-16 border rounded-3xl bg-slate-200 flex items-center justify-center">
              <i className=" fa fa-money"></i>
            </div>
          </div>
          <div className=" h-full w-3/5 p-2 py-8 flex text-sm font-semibold text-slate-500 flex-col">
            {" "}
            <h2> Total Revenue</h2>
            <h3 className=" text-slate-900 text-3xl font-bold">{revenue}₹</h3>
          </div>
        </div>

        <div className=" h-26 md:h-full md:w-1/4  border rounded-xl flex overflow-hidden">
        <div className=" flex w-2/5 md:h-full h-26 rounded-xl md:bg-none  justify-center items-center">
            <div className=" text-green-600 text-2xl h-16 w-16 border rounded-3xl bg-slate-200 flex items-center justify-center">
              <i class="fa fa-cart-shopping"></i>
            </div>
          </div>
          <div className=" h-full w-3/5 p-2 py-8 flex text-sm font-semibold text-slate-500 flex-col">
            {" "}
            <h2> Total Orders</h2>
            <h3 className="text-slate-900 text-3xl font-bold">
              {" "}
              {totalOrders}
            </h3>
          </div>
        </div>

        <div className=" h-26 md:h-full md:w-1/4  border rounded-xl flex overflow-hidden">
        <div className=" flex w-2/5 md:h-full h-26 rounded-xl md:bg-none  justify-center items-center">
            <div className=" text-green-600 text-2xl h-16 w-16 border rounded-3xl bg-slate-200 flex items-center justify-center">
              <i className=" fa-regular fa-user"></i>
            </div>
          </div>
          <div className=" h-full w-3/5 p-2 py-8 flex text-sm font-semibold text-slate-500 flex-col">
            {" "}
            <h2> Total Customers</h2>
            <h3 className="text-slate-900 text-3xl font-bold">
              {totalCustomer}
            </h3>
          </div>
        </div>

        <div className=" h-26 md:h-full md:w-1/4  border rounded-xl flex overflow-hidden">
        <div className=" flex w-2/5 md:h-full h-26 rounded-xl md:bg-none  justify-center items-center">
            <div className=" text-green-600 text-2xl h-16 w-16 border rounded-3xl bg-slate-200 flex items-center justify-center">
              <i class="fa-solid fa-box"></i>
            </div>
          </div>
          <div className=" h-full w-3/5 p-2 py-8 flex text-sm font-semibold text-slate-500 flex-col">
            {" "}
            <h2> Average Order Price</h2>
            <h3 className=" text-slate-900 text-3xl font-bold">
              {" "}
              {parseInt(revenue) / parseInt(totalOrders)}₹
            </h3>
          </div>
        </div>
      </div>
      <div className=" w-full h-fit border rounded-lg flex flex-col justify-end mb-5">
        <div className=" w-32 p-5 text-sm">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={yearValue}
              onChange={handleChange}
            >
              {years.map((year) => {
                console.log(year);
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="overflow-visible ">
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: yearlyStatistics,
                color: "#03960b",
              },
            ]}
            sx={{ width: "fit" }}
            height={300}
            leftAxis={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
