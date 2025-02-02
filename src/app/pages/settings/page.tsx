"use client";
import React from "react";
import ContentPage from "@/app/components/contentPage";
import { Button, Card, Checkbox, Descriptions, Form, Input, Tabs } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getQueryUserById } from "@/controller/userQuery";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function Page() {
  const { data: session } = useSession();
  const [changePass, setChangePass] = React.useState(false);

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["dataUser"],
    queryFn: async () =>
      await getQueryUserById({ id: (session?.user?.id as string) || "" }),
    enabled: !!session?.user,
  });

  if (isErrorUser) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorUser.message,
      showConfirmButton: true,
    });
  }

  return (
    <ContentPage>
      <Tabs
        type="card"
        items={[
          {
            label: "Setting Account",
            key: "1",
            children: (
              <Card size="small" loading={isLoadingUser}>
                <div className="flex flex-col gap-3">
                  <Descriptions
                    bordered
                    size="small"
                    title="User Info"
                    layout="horizontal"
                    items={[
                      {
                        key: "1",
                        label: "Fullname",
                        children: dataUser?.name,
                      },
                      {
                        key: "2",
                        label: "Phone",
                        children: dataUser?.phone,
                      },
                      {
                        key: "3",
                        label: "Username",
                        children: dataUser?.username,
                      },
                      {
                        key: "4",
                        label: "Email",
                        children: dataUser?.email,
                      },
                    ]}
                  />

                  <Checkbox
                    onChange={(e) => {
                      setChangePass(e.target.checked);
                    }}
                  >
                    Change Password?
                  </Checkbox>

                  {changePass && (
                    <div>
                      <Form
                        name="basic"
                        autoComplete="off"
                        className=" max-w-xs"
                      >
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                            {
                              pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must be strong: include upper, lower, number, special character, and at least 8 characters.",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item label={null}>
                          <Button type="primary" htmlType="submit">
                            Save
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  )}
                </div>
              </Card>
            ),
          },
        ]}
      />
    </ContentPage>
  );
}
