import React from "react";
import { Avatar, Badge, Button, Flex, Image, Layout, Menu, theme } from "antd";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { FaBell, FaPowerOff, FaSitemap, FaUser } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { HiDocumentText } from "react-icons/hi";
const { Sider, Header, Content } = Layout;

interface ContentPageProps {
  children: React.ReactNode;
}

const ContentPage: React.FC<ContentPageProps> = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        className="bg-white"
        trigger={null}
        breakpoint="md"
        collapsedWidth="80"
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
          console.log(collapsed, type);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          background: colorBgContainer,
        }}
      >
        <Flex align="center" className="my-3" justify="center">
          <Image
            preview={false}
            src="/image/molecule.png"
            alt="logo"
            className="!w-5 !h-5 mx-2"
          />

          {!collapsed && (
            <span className="text-xs font-bold">NMS Monitoring</span>
          )}
        </Flex>
        <Menu
          mode="inline"
          defaultSelectedKeys={[usePathname()]}
          items={[
            {
              key: "/pages/dashboard",
              icon: <AiFillDashboard />,
              label: "Dashboard",
              children: [
                {
                  key: "/pages/dashboard/zabbix",
                  label: "ZABBIX",
                  onClick: () => {
                    router.replace("/pages/dashboard/zabbix");
                  },
                },
                {
                  key: "/pages/dashboard/prtg",
                  label: "PRTG",
                  onClick: () => {
                    router.replace("/pages/dashboard/prtg");
                  },
                },
              ],
            },
            {
              key: "/pages/items-list",
              icon: <FaSitemap />,
              label: "Item List",
              children: [
                {
                  key: "/pages/items-list/zabbix",
                  label: "ZABBIX",
                  onClick: () => {
                    router.replace("/pages/items-list/zabbix");
                  },
                },
                {
                  key: "/pages/items-list/prtg",
                  label: "PRTG",
                  onClick: () => {
                    router.replace("/pages/items-list/prtg");
                  },
                },
              ],
            },
            {
              key: "/pages/report",
              icon: <HiDocumentText />,
              label: "Report",
              children: [
                {
                  key: "/pages/report/zabbix",
                  label: "ZABBIX",
                  onClick: () => {
                    router.replace("/pages/report/zabbix");
                  },
                },
                {
                  key: "/pages/report/prtg",
                  label: "PRTG",
                  onClick: () => {
                    router.replace("/pages/report/prtg");
                  },
                },
              ],
            },
          ]}
        />
      </Sider>

      <Layout style={{ marginInlineStart: collapsed ? 80 : 200 }}>
        <Header
          className="flex flex-row justify-between "
          style={{ padding: 0, background: "#001529" }}
        >
          <Button
            type="text"
            icon={collapsed ? <RiMenuUnfoldFill /> : <RiMenuFoldFill />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="font-bold text-white"
          />
          <div className="flex gap-5 items-center">
            <Badge count={5}>
              <Button shape="circle" icon={<FaBell />} />
            </Badge>

            <Avatar style={{ backgroundColor: "#87d068" }} icon={<FaUser />} />

            <span className="text-md text-white font-bold">Developer</span>

            <Button
              type="text"
              className="text-white"
              icon={<FaPowerOff />}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
              onClick={async () => {}}
            />
          </div>
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 14,
              minHeight: "80vh",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContentPage;
