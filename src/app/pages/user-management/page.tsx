"use client";

import React from "react";
import ContentPage from "@/app/components/contentPage";
import {
  getQueryUser,
  settQueryUserActive,
  settQueryUserZabbixAgent,
} from "@/controller/userQuery";
import { Select, Switch, Table, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import axios from "axios";
import _ from "lodash";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const { Search } = Input;

export default function Page() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["listUsers", page, pageSize, filter],
    queryFn: async () => await getQueryUser({ page, pageSize, filter }),
  });

  const {
    data: zabbixHost,
    isLoading: loadingZabbixhost,
    isError: isErrorZabbixHost,
    error: errorZabbixHost,
  } = useQuery({
    queryKey: ["zabbixHost"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/zabbix/get-host"
        );
        return response.data.result;
      } catch (err) {
        throw err;
      }
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) =>
      await settQueryUserActive({ id, isActive: !isActive }),

    onSuccess: async (data) => {
      queryClient.setQueryData(
        ["listUsers", page, pageSize, filter],
        (oldData: { users: { id: string; isActive: boolean }[] }) =>
          oldData
            ? {
                ...oldData,
                users: oldData.users.map((user) =>
                  user.id === data?.id
                    ? { ...user, isActive: !data?.isActive }
                    : user
                ),
              }
            : oldData
      );

      await queryClient.refetchQueries({
        queryKey: ["listUsers"],
        type: "active",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        showConfirmButton: true,
      });
    },
  });

  const mutationZabbix = useMutation({
    mutationFn: async ({
      id,
      zabbixGroupId,
    }: {
      id: string;
      zabbixGroupId: string;
    }) =>
      await settQueryUserZabbixAgent({
        id,
        zabbixGroupId,
        by: session?.user?.name as string,
      }),

    onSuccess: async (data) => {
      queryClient.setQueryData(
        ["listUsers", page, pageSize, filter],
        (oldData: { users: { id: string; zabbixGroupId: number }[] }) =>
          oldData
            ? {
                ...oldData,
                users: oldData.users.map((user) =>
                  user.id === data?.id
                    ? {
                        ...user,
                        zabbixGroupId: data?.zabbixGroupId,
                      }
                    : user
                ),
              }
            : oldData
      );

      await queryClient.refetchQueries({
        queryKey: ["listUsers"],
        type: "active",
      });
      Swal.fire("Saved!", "", "success");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        showConfirmButton: true,
      });
    },
  });

  if (isErrorZabbixHost) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorZabbixHost.message,
      showConfirmButton: true,
    });
  }

  return (
    <ContentPage>
      <div className="my-3">
        <Search
          placeholder="input search text"
          allowClear
          onSearch={(value) => {
            setFilter(value);
          }}
          style={{ width: 200 }}
        />
      </div>

      <Table
        scroll={{ x: 2000, y: 650 }}
        bordered
        rowKey="id"
        loading={isLoading}
        columns={[
          {
            title: "Action",
            key: "operation",
            fixed: "left",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),

            align: "match-parent",
            render: (itx, record) => (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center justify-between w-full">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs">Select group zabbix</span>
                    <Select
                      loading={loadingZabbixhost}
                      className="w-full"
                      options={_.map(zabbixHost, (o) => ({
                        value: o.uuid,
                        label: <span className="text-xs">{o.name}</span>,
                      }))}
                      showSearch
                      size="small"
                      value={
                        record.zabbixGroupId &&
                        _.find(
                          zabbixHost,
                          (o) => o.uuid === record.zabbixGroupId
                        )?.name
                      }
                      onChange={(value) => {
                        Swal.fire({
                          title: `Do you want to save the changes to ${
                            _.find(zabbixHost, (o) => o.uuid === value)?.name
                          }?`,
                          showDenyButton: true,
                          showCancelButton: false,
                          confirmButtonText: "Save",
                          denyButtonText: `Don't save`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            mutationZabbix.mutate({
                              id: record.id,
                              zabbixGroupId: value,
                            });
                          } else if (result.isDenied) {
                            Swal.fire("Changes are not saved", "", "info");
                          }
                        });
                      }}
                    />
                    <span className="text-xs">Select group prtg</span>
                    <Select
                      className="w-full"
                      options={[
                        {
                          value: "sample",
                          label: <span className="text-xs">sample</span>,
                        },
                      ]}
                      showSearch
                      size="small"
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs">inActive</span>
                  <Switch
                    size="small"
                    checked={!record.isActive}
                    onChange={(checked: boolean) => {
                      console.log(`switch to ${checked}`);
                      mutation.mutate({
                        id: record.id,
                        isActive: checked,
                      });
                    }}
                  />
                </div>
              </div>
            ),
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),

            render: (text) => <span className="text-xs">{text}</span>,
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => <span className="text-xs">{text}</span>,
          },
          {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => <span className="text-xs">{text}</span>,
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => <span className="text-xs">{text}</span>,
          },
          {
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => (
              <span className="text-xs">
                {dayjs(text).format("DD MMMM YYYY HH:mm")}
              </span>
            ),
          },
          {
            title: "updatedAt",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => (
              <span className="text-xs">
                {dayjs(text).format("DD MMMM YYYY HH:mm")}
              </span>
            ),
          },
          {
            title: "createdBy",
            dataIndex: "createdBy",
            key: "createdBy",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => <span className="text-xs">{text}</span>,
          },
          {
            title: "updatedBy",
            dataIndex: "updatedBy",
            key: "updatedAt",
            width: "20%",
            onHeaderCell: () => ({
              style: { textAlign: "center" }, // Center the header content
            }),
            render: (text) => <span className="text-xs">{text}</span>,
          },
        ]}
        dataSource={data?.users || []}
        pagination={{
          showQuickJumper: true,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
          responsive: true,
          current: page,
          pageSize,
          total: data?.total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          position: ["bottomCenter"],
        }}
      />
    </ContentPage>
  );
}
