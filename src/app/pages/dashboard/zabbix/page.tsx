"use client";

import ContentPage from "@/app/components/contentPage";
import { Button, Card, Divider, Statistic, Input } from "antd";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts-pro";

const { Search } = Input;

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function Page() {
  return (
    <ContentPage>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-rows-1 gap-4 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
        <div>
          <Card bordered={false} className="flex flex-col gap-5">
            <Statistic
              title="Total Environment"
              value={128}
              valueStyle={{ fontWeight: "bold" }}
            />
            <span className="text-lg font-bold">Devices</span>
            <Divider className="!my-2" />
            <Button type="link" size="small" className="text-xs text-blue-950">
              Go to ZABBIX Portal
            </Button>
          </Card>
        </div>

        <div>
          <Card bordered={false} className="flex flex-col gap-5">
            <Statistic
              title="Status Up"
              value={128}
              valueStyle={{ fontWeight: "bold" }}
            />
            <span className="text-lg font-bold">Up Devices</span>
            <Divider className="!my-2" />
            <Button type="link" size="small" className="text-xs text-blue-950">
              Daily Visits 1444
            </Button>
          </Card>
        </div>

        <div>
          <Card bordered={false} className="flex flex-col gap-5">
            <Statistic
              title="Status Down"
              value={0}
              valueStyle={{ fontWeight: "bold" }}
            />
            <span className="text-lg font-bold">Down Devices</span>
            <Divider className="!my-2" />
            <Button type="link" size="small" className="text-xs text-blue-950">
              Conversion Rate 60%
            </Button>
          </Card>
        </div>

        <div>
          <Card bordered={false} className="flex flex-col gap-5">
            <Statistic
              title="Total Item"
              value={128}
              valueStyle={{ fontWeight: "bold" }}
            />
            <span className="text-lg font-bold">Items</span>
            <Divider className="!my-2" />
            <Button type="link" size="small" className="text-xs text-blue-950">
              All Clients
            </Button>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-2 gap-4 my-5">
        <div>
          <Card
            bordered={false}
            className="flex flex-col"
            title="Status Summary"
          >
            <div style={{ height: 400, width: "100%" }}>
              <DataGridPremium
                rows={[]}
                columns={[
                  { field: "col1", headerName: "Total Devices", width: 150 },
                  { field: "col2", headerName: "Client", width: 150 },
                  { field: "col3", headerName: "Trigger", width: 150 },
                  { field: "col4", headerName: "Unresolved", width: 150 },
                ]}
              />
            </div>
          </Card>
        </div>
        <div>
          <Card
            bordered={false}
            className="flex flex-col gap-5 h-full"
            title="Summary Problem by Severity"
          >
            <Search
              placeholder="input search text"
              onSearch={() => {}}
              className="w-32"
            />
            <div className="flex justify-center items-center my-5">
              <PieChart
                series={[
                  {
                    data: [
                      { value: 5, label: "A" },
                      { value: 10, label: "B" },
                      { value: 15, label: "C" },
                      { value: 20, label: "D" },
                    ],
                    innerRadius: 80,
                  },
                ]}
                height={250}
                width={500}
              >
                <PieCenterLabel>Serverity</PieCenterLabel>
              </PieChart>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 my-5">
        <div>
          <Card
            bordered={false}
            className="flex flex-col"
            title="Status Summary"
          >
            <div style={{ height: 500, width: "100%" }}>
              <DataGridPremium
                rows={[]}
                columns={[
                  { field: "col1", headerName: "Times", width: 250 },
                  { field: "col2", headerName: "Client", width: 250 },
                  { field: "col3", headerName: "Host", width: 250 },
                  { field: "col4", headerName: "Problem", width: 250 },
                ]}
              />
            </div>
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
