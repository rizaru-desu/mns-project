"use client";

import ContentPage from "@/app/components/contentPage";
import { Card, Avatar, List, Skeleton } from "antd";
import { GaugeComponent } from "react-gauge-component";

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
          <Card title="CPU Usage" bordered={false}>
            <GaugeComponent
              arc={{
                subArcs: [
                  {
                    limit: 20,
                    color: "#5BE12C",
                    showTick: true,
                    tooltip: {
                      text: "CPU Usage is Very Low",
                    },
                  },
                  {
                    limit: 40,
                    color: "#F5CD19",
                    showTick: true,
                    tooltip: {
                      text: "CPU Usage is Low",
                    },
                  },
                  {
                    limit: 60,
                    color: "#F58B19",
                    showTick: true,
                    tooltip: {
                      text: "CPU Usage is Moderate",
                    },
                  },
                  {
                    limit: 80,
                    color: "#EA4228",
                    showTick: true,
                    tooltip: {
                      text: "Memory Usage is High",
                    },
                  },
                  {
                    limit: 100,
                    color: "#D90000",
                    showTick: true,
                    tooltip: {
                      text: "CPU Usage is High",
                    },
                  },
                ],
              }}
              value={10}
            />
          </Card>
        </div>

        <div>
          <Card title="Memory Usage" bordered={false}>
            <GaugeComponent
              arc={{
                subArcs: [
                  {
                    limit: 20,
                    color: "#5BE12C",
                    showTick: true,
                    tooltip: {
                      text: "Memory Usage is Very Low",
                    },
                  },
                  {
                    limit: 40,
                    color: "#F5CD19",
                    showTick: true,
                    tooltip: {
                      text: "Memory Usage is Low",
                    },
                  },
                  {
                    limit: 60,
                    color: "#F58B19",
                    showTick: true,
                    tooltip: {
                      text: "Memory Usage is Moderate",
                    },
                  },
                  {
                    limit: 80,
                    color: "#EA4228",
                    showTick: true,
                    tooltip: {
                      text: "Memory Usage is High",
                    },
                  },
                  {
                    limit: 100,
                    color: "#D90000",
                    showTick: true,
                    tooltip: {
                      text: "Memory Usage is Critical!",
                    },
                  },
                ],
              }}
              value={60}
            />
          </Card>
        </div>

        <div>
          <Card title="Disk Usage" bordered={false}>
            <GaugeComponent
              arc={{
                subArcs: [
                  {
                    limit: 20,
                    color: "#5BE12C",
                    showTick: true,
                    tooltip: {
                      text: "Disk Usage is Very Low",
                    },
                  },
                  {
                    limit: 40,
                    color: "#F5CD19",
                    showTick: true,
                    tooltip: {
                      text: "Disk Usage is Low",
                    },
                  },
                  {
                    limit: 60,
                    color: "#F58B19",
                    showTick: true,
                    tooltip: {
                      text: "Disk Usage is Moderate",
                    },
                  },
                  {
                    limit: 80,
                    color: "#EA4228",
                    showTick: true,
                    tooltip: {
                      text: "Disk Usage is High",
                    },
                  },
                  {
                    limit: 100,
                    color: "#D90000",
                    showTick: true,
                    tooltip: {
                      text: "Disk Usage is Critical! Free Up Space!",
                    },
                  },
                ],
              }}
              value={85}
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
