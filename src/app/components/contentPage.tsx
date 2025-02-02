import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Image,
  Layout,
  Menu,
  Skeleton,
  theme,
} from "antd";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { FaBell, FaPowerOff, FaUser } from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/action/auth.action";
import { useSession } from "next-auth/react";
import type { MenuProps } from "antd";
import { getQueryMenu } from "@/controller/menuQuery";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";

const { Sider, Header, Content } = Layout;

interface ContentPageProps {
  children: React.ReactNode;
}

async function dbMenus({ userId }: { userId?: string }) {
  return await getQueryMenu({ id: userId });
}

const ContentPage: React.FC<ContentPageProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [collapsed, setCollapsed] = React.useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["listMenus"],
    queryFn: async () => await dbMenus({ userId: session?.user?.id }),
    enabled: !!session?.user,
  });

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Layout hasSider>
      <Sider
        className="bg-white"
        trigger={null}
        breakpoint="md"
        collapsedWidth="80"
        collapsed={collapsed}
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
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
            src="/image/logo.png"
            alt="logo"
            className="!w-5 !h-5 mx-2"
          />

          {!collapsed && (
            <span className="text-xs font-bold">NMS Monitoring</span>
          )}
        </Flex>

        {isLoading && (
          <Flex align="center" className="px-3" justify="center">
            <Skeleton active paragraph={{ rows: 10 }} />
          </Flex>
        )}

        {data && (
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            items={_.map(data, (item) => ({
              key: item.path,
              icon: item.icon
                ? React.createElement(
                    MdIcons[item.icon as keyof typeof MdIcons]
                  )
                : null,
              label: item.name,

              children: _.isEmpty(item.children)
                ? undefined
                : _.map(item.children, (child) => ({
                    key: child.path,
                    label: child.name,
                  })),
            }))}
            onClick={onClick}
          />
        )}
      </Sider>

      <Layout style={{ marginInlineStart: collapsed ? 80 : 200 }}>
        <Header
          className="flex flex-row justify-between bg-[#21B198]"
          style={{ padding: 0 }}
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

            <span className="text-md text-white font-bold">
              {session?.user?.name}
            </span>

            <Button
              type="text"
              className="text-white"
              icon={<FaPowerOff />}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
              onClick={async () => {
                await logout();
              }}
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
