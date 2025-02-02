"use client";
import React from "react";
import { authenticate } from "@/action/auth.action";
import {
  Layout,
  Form,
  Input,
  Button,
  Flex,
  Image,
  Typography,
  Space,
} from "antd";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";

type FieldLoginType = {
  Email?: string;
  password?: string;
  code?: number;
};

const { Content, Footer } = Layout;
const { Text } = Typography;

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout className="min-h-screen flex flex-col">
      <Content className="flex-1 flex flex-col items-center justify-center bg-[url('/image/bg.png')] bg-contain bg-center bg-no-repeat">
        <Flex align="center" className="my-10">
          <Image
            preview={false}
            src="/image/logo.png"
            alt="logo"
            className="!w-12 !h-12 mx-5"
          />
          <Flex vertical>
            <span className="text-2xl font-black">NMS Monitoring</span>
            <Text type="secondary" className="text-md">
              ZABBIX & PRTG Monitoring Tools
            </Text>
          </Flex>
        </Flex>

        <Form
          name="login-form"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={async (values) => {
            setLoading(true);
            const authLogin = await authenticate({
              username: values.username,
              password: values.password,
            });

            setLoading(false);
            if (authLogin.success) {
              router.replace("/pages/dashboard/zabbix");
            } else {
              Swal.fire({
                title: "Error!",
                text: authLogin.error,
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#3085d6",
              });
            }
          }}
        >
          <Form.Item<FieldLoginType>
            name="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input prefix={<FaUserAlt />} placeholder="Username" />
          </Form.Item>

          <Form.Item<FieldLoginType>
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<FaLock />}
              placeholder="Password"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item<FieldLoginType>
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your verification code!",
              },
            ]}
          >
            <Space direction="horizontal">
              <Input placeholder="input Verification Code" />
              <Button onClick={() => {}}>Get Code</Button>
            </Space>
          </Form.Item>

          <Form.Item label={null}>
            <Button loading={loading} type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Content>

      <Footer className="text-center py-4 bg-gray-100">
        © {new Date().getFullYear()} Produced by PT Hipernet Indodata.
      </Footer>
    </Layout>
  );
}
