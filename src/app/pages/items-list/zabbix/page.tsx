"use client";

import ContentPage from "@/app/components/contentPage";
import { Card, Avatar, List, Skeleton } from "antd";
import { Chart } from "react-google-charts";

const data = Array.from({ length: 23 }).map((_, i) => ({
  title: `Lorem ipsum ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
}));

export default function Page() {
  return (
    <ContentPage>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-rows-1 gap-4 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
        <div>
          <Card title="Status" bordered={false}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
        </div>

        <div>
          <Card
            title="CPU Usage"
            bordered={false}
            className="flex flex-col items-center justify-center"
          >
            <Chart
              chartType="Gauge"
              width="100%"
              height="100%"
              data={[
                ["Label", "Value"],
                ["CPU", 10],
              ]}
              options={{
                width: 400,
                height: 170,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5,
              }}
            />
          </Card>
        </div>

        <div>
          <Card
            title="Memory Usage"
            bordered={false}
            className="flex flex-col items-center justify-center"
          >
            <Chart
              chartType="Gauge"
              width="100%"
              height="100%"
              data={[
                ["Label", "Value"],
                ["Memory", 24],
              ]}
              options={{
                width: 400,
                height: 170,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5,
              }}
            />
          </Card>
        </div>

        <div>
          <Card
            title="Disk Usage"
            bordered={false}
            className="flex flex-col items-center justify-center"
          >
            <Chart
              chartType="Gauge"
              width="100%"
              height="100%"
              data={[
                ["Label", "Value"],
                ["Disk", 85],
              ]}
              options={{
                width: 400,
                height: 170,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5,
              }}
            />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 my-5">
        <div>
          <Card bordered={false} title="Problem Status">
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                pageSize: 5,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <span key={"1"} className="text-sm text-gray-400">
                      7 days ago
                    </span>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<span>{item.title}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
