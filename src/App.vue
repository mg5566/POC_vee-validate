<template>
  <div class="app-container">
    <Form v-slot="{ values }" :validation-schema="schema" @submit="submitForm">
      <Table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="tableData"
        :row-key="'id'"
        :pagination="false"
        :scroll="{ y: 300 }"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <span v-if="record.type === 'instance'">
              <ApartmentOutlined />
            </span>
            <span v-if="record.type === 'port'">
              <FolderOutlined />
            </span>
            {{ record.name ? record.name : "(No Name)" }}
          </template>
          <template v-if="column.key === 'id'">
            <div class="text-ellipsis">
              <span>{{ record.id }}</span>
            </div>
          </template>
        </template>
      </Table>
      <div class="data-container">
        <TypographyTitle>data section</TypographyTitle>
        <div>{{ values }}</div>
        <ArrayViewer :data-source="selectedData" />
        <ArrayField
          v-model="selectedData"
          @removeSelectedData="removeSelectedData"
        />
      </div>
      <div>
        <Button html-type="submit"
          >submit {{ isSubmitted ? "완료" : "" }}</Button
        >
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableColumnType,
  TypographyTitle,
  Button,
} from "ant-design-vue";
import { ref } from "vue";
import ArrayViewer from "./components/ArrayViewer.vue";
import { Form, defineRule } from "vee-validate";
import ArrayField from "./components/ArrayField.vue";
import { ApartmentOutlined, FolderOutlined } from "@ant-design/icons-vue";

/**
 * a table component 의 columns 을 정의하는 data
 */
const columns: TableColumnType<TableDataItem>[] = [
  {
    title: "인스턴스/포트명",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "네트워크",
    dataIndex: "networkName",
    key: "networkName",
  },
  {
    title: "고정 IP",
    dataIndex: "fixedIp",
    key: "fixedIp",
  },
];

export interface TableDataItem {
  key: string;
  id: string;
  name: string;
  type: string; // 인스턴스와 포트 구분 필드명. instance/port
  networkName?: string;
  fixedIp?: string;
  port: number;
  weight: number;
  checkDisabled?: boolean;
  children?: TableDataItem[];
}
const tableData = ref<TableDataItem[]>([]);

/**
 * a table component 에서 row selection 에 의해서 선택된 row 를 저장하는 data
 */
export interface SelectedData {
  rows: TableDataItem[];
  keys: (string | number)[];
}
const selectedData = ref<SelectedData>({
  rows: [],
  keys: [],
});

// const addFields = (values: any) => {
//   values.user = (values.user || []).concat([{}]);
// };
// const removeFields = (i: number, values: any) => {
//   const v = values.user.filter((_, index: number) => {
//     return i !== index;
//   });
//   values.user = v;
// };
// const findRemoveIndex = (dest: any[], src: any[]) => {
//   const difference = dest.filter((item) => !src.includes(item));
//   const removedItem = difference[0];
//   return dest.indexOf(removedItem);
// };
const rowSelection = {
  onChange: (
    selectedRowKeys: (string | number)[],
    selectedRows: TableDataItem[]
  ) => {
    console.log("selectedRowKeys", selectedRowKeys);
    console.log("selectedRows", selectedRows);
    console.log("selectedData", selectedData.value);

    // // add
    // if (selectedData.value.rows.length < selectedRows.length) {
    //   console.log("add", values);
    //   addFields(values);
    // }
    // // remove
    // else {
    //   console.log("remove", values);
    //   const idx = findRemoveIndex(selectedData.value.keys, selectedRowKeys);
    //   removeFields(idx, values);
    // }

    selectedData.value.rows = selectedRows;
    selectedData.value.keys = selectedRowKeys;
  },
  hideSelectAll: true,
  getCheckboxProps: (record: TableDataItem) => ({
    disabled: record.checkDisabled,
    style: record.checkDisabled ? "display: none;" : "",
  }),
};

const test = ref([
  {
    id: "test-id",
    name: "test-name",
    network: {
      addresses: [
        {
          networkName: "test-network-1",
          portName: "test-port-1",
          addr: "0.0.0.1",
        },
        {
          networkName: "test-network-2",
          portName: "test-port-2",
          addr: "0.0.0.2",
        },
      ],
    },
  },
]);
test.value.map((instance, idx) => {
  let childrenData = [] as TableDataItem[];
  instance.network.addresses.map((addr, innerIdx) => {
    childrenData.push({
      key: innerIdx + "",
      id: addr.addr,
      name: addr.portName,
      networkName: addr.networkName,
      fixedIp: addr.addr,
      port: 65535,
      weight: 256,
      type: "port",
    });
  });
  tableData.value.push({
    key: idx + "",
    id: instance.id,
    name: instance.name,
    type: "instance",
    port: 0,
    weight: 0,
    checkDisabled: true,
    children: childrenData.length > 0 ? childrenData : undefined,
  });
});

const removeSelectedData = (item: TableDataItem) => {
  let index = selectedData.value.rows.indexOf(item);
  if (index !== -1) {
    selectedData.value.rows.splice(index, 1);
    selectedData.value.keys.splice(index, 1);
  }
};

defineRule("conInputRequired", (value: string | number, data: string[]) => {
  if (value === null || value === undefined || value === "") {
    return `${data}를 입력해 주세요.`;
  }
  return true;
});

// 0 이상 정수(자연수)만 입력 가능 유효성 체크
defineRule("conInputOnlyNaturalNumber", (value: string) => {
  const regex = /^[0-9]*$/;
  if (value && !regex.test(value)) {
    return `정수인 숫자만 입력 가능 합니다.`;
  }
  return true;
});

const isSubmitted = ref(false);
const submitForm = () => {
  console.log("제출");
  isSubmitted.value = true;
};

// const schema = {
//   user: [
//     {
//       weight: {
//         conInputRequired: "가중치",
//         conInputOnlyNumber: String,
//         conInputOnlyNaturalNumber: String,
//       },
//       port: {
//         conInputRequired: "포트",
//         conInputOnlyNumber: String,
//         conInputOnlyNaturalNumber: String,
//       },
//     },
//   ],
// };
const schema = undefined;

// const schema = yup.object().shape({
//   user: yup
//     .array()
//     .of(
//       yup.object().shape({
//         weight: {
//           conInputRequired: "가중치",
//           conInputOnlyNumber: String,
//           conInputOnlyNaturalNumber: String,
//         },
//         port: {
//           conInputRequired: "포트",
//           conInputOnlyNumber: String,
//           conInputOnlyNaturalNumber: String,
//         },
//         // weight: yup.required().number().min(1).label("weight"),
//         // port: yup.required().number().min(1).label("port"),
//       })
//     )
//     .strict(),
// });
</script>

<style scoped>
.app-container {
  width: 80%;
  padding: 40px;
}

.data-container {
  padding: 40px;
}
</style>
