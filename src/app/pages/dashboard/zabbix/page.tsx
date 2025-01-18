"use client";
import React from "react";
import ContentPage from "@/app/components/contentPage";
import { Button, Card, Divider, Statistic, Table } from "antd";
import type { TableProps } from "antd";
import { Chart } from "react-google-charts";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface DataTypeSummary {
  key: string;
  totalDevice: number;
  client: string;
  triger: number;
  unresolved: number;
}

interface DataTypeSummaryClient {
  key: string;
  time: Date;
  client: string;
  host: string;
  problem: string;
}

const data = [
  ["Severity", "Count"],
  ["Critical", 5],
  ["High", 10],
  ["Medium", 15],
  ["Low", 20],
];
const options = {
  pieHole: 0.4,
  is3D: false,
};

export default function Page() {
  const columnsSummary: ColumnsType<DataTypeSummary> = [
    {
      title: "Total Device",
      dataIndex: "totalDevice",
      key: "totalDevice",
      sorter: (a, b) => a.totalDevice - b.totalDevice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: (a, b) => a.client.length - b.client.length,
      sortDirections: ["descend", "ascend"],
      filterSearch: true,
      filters: [],
      onFilter: (value, record) => record.client.startsWith(value as string),
    },
    {
      title: "Triger",
      dataIndex: "triger",
      key: "triger",
      sorter: (a, b) => a.triger - b.triger,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Unresolved",
      dataIndex: "unresolved",
      key: "unresolved",
      sorter: (a, b) => a.unresolved - b.unresolved,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const columnsSummaryClient: ColumnsType<DataTypeSummaryClient> = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: (a, b) => a.client.length - b.client.length,
      sortDirections: ["descend", "ascend"],
      filterSearch: true,
      filters: [],
      onFilter: (value, record) => record.client.startsWith(value as string),
    },
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
      sorter: (a, b) => a.host.length - b.host.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
      sorter: (a, b) => a.problem.length - b.problem.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <ContentPage>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-rows-1 gap-4 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
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
            className="flex flex-col h-full"
            title="Status Summary"
          >
            <Table<DataTypeSummary>
              columns={columnsSummary}
              scroll={{ x: true }}
              dataSource={[]}
              size="small"
              pagination={{ position: ["bottomRight"] }}
            />
          </Card>
        </div>
        <div>
          <Card
            bordered={false}
            className="flex flex-col h-full"
            title="Summary Problem by Severity"
          >
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
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
              <Table<DataTypeSummaryClient>
                columns={columnsSummaryClient}
                scroll={{ x: true }}
                dataSource={[]}
                size="small"
                pagination={{ position: ["bottomRight"] }}
              />
            </div>
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
