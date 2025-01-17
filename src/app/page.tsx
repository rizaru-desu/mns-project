"use client";
import {
  Layout,
  Tabs,
  Form,
  Input,
  Checkbox,
  Button,
  Flex,
  Image,
  Typography,
  Space,
} from "antd";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type FieldLoginType = {
  username?: string;
  password?: string;
  remember?: string;
};

type FieldRegisterType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  code?: number;
};

const { Content, Footer } = Layout;
const { Text } = Typography;

export default function Page() {
  const route = useRouter();
  return (
    <Layout className="min-h-screen flex flex-col">
      <Content className="flex-1 flex flex-col items-center justify-center bg-[url('/image/bg.png')] bg-contain bg-center bg-no-repeat">
        <Flex align="center" className="my-10">
          <Image
            preview={false}
            src="/image/molecule.png"
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

        <Tabs
          className="w-[90%] md:w-1/3 lg:w-1/3 xl:w-1/3"
          animated
          size="small"
          type="card"
          items={[
            {
              label: "Login",
              key: "login",
              children: (
                <Form
                  name="login-form"
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  onFinish={(values) => {
                    console.log(values);
                    route.replace("/pages/dashboard/zabbix");
                  }}
                >
                  <Form.Item<FieldLoginType>
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
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
                    />
                  </Form.Item>

                  <Flex justify="space-between" align="center">
                    <Form.Item<FieldLoginType>
                      name="remember"
                      valuePropName="checked"
                      label={null}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Button type="link">Forgot your password</Button>
                  </Flex>

                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              label: "Sign Up",
              key: "register",
              children: (
                <Form
                  name="register-form"
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item<FieldRegisterType>
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input prefix={<FaUserAlt />} placeholder="Email" />
                  </Form.Item>

                  <Form.Item<FieldRegisterType>
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
                    />
                  </Form.Item>

                  <Form.Item<FieldRegisterType>
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your confirm password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<FaLock />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>

                  <Form.Item<FieldRegisterType>
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <PhoneInput
                      country={"id"}
                      inputStyle={{ width: "100%" }}
                      containerStyle={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item<FieldRegisterType>
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
                    <Button type="primary" htmlType="submit">
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Content>

      <Footer className="text-center py-4 bg-gray-100">
        © {new Date().getFullYear()} Produced by PT Hipernet Indodata.
      </Footer>
    </Layout>
  );
}
