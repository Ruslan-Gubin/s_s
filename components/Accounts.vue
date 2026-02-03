<script setup lang="ts">
import { ref } from 'vue';
import { EVENT_CODE } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

interface AccountModel {
  id: number;
  tags: string[];
  recordType: 'local' | 'ldap',
  login: string;
  password: string | null,
};


const props = defineProps<{ accountList: AccountModel[] }>();


const handleDelete = (id: number,) => {
  console.log(id)
};

const accountList = ref<AccountModel[]>([
  {
    id: 1,
    tags: ['tag1', 'tag2', 'tag3'],
    recordType: 'local',
    login: "",
    password: null,
    isShowPassword: true,
  },
  {
    id: 2,
    tags: ['tag1', 'tag2', 'tag3'],
    recordType: 'ldap',
    login: "",
    password: null,
    isShowPassword: false,
  },
  {
    id: 3,
    tags: ['tag1', 'tag2', 'tag3'],
    recordType: 'local',
    login: "",
    password: null,
    isShowPassword: true,
  },
  {
    id: 4,
    tags: ['tag1', 'tag2', 'tag3'],
    recordType: 'ldap',
    login: "",
    password: null,
    isShowPassword: false,
  },
]);

const options = [
  {
    value: 'local',
    label: 'Локальная',
  },
  {
    value: 'ldap',
    label: 'LDAP',
  },
];


const saveChangeInput = (e) => {
  console.log('saveChangeInput:', e.target.value)
};


const handleKeyInputTags = (e) => {
  const isAddTag = e.code === 'Semicolon';

  if (isAddTag) {
    e.preventDefault();
    let newTag = e.target.value;

    var event = new KeyboardEvent("keydown", {
      code: "Enter",
      key: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: false
    });

    e.target.dispatchEvent(event);
  }
};

const handleSaveTag = (e) => {
  const tagsString: string = e.target.dataset.tags ?? '';
  const convertTagsArray = tagsString.split(',');
  const correctStringLength = tagsString.length - (convertTagsArray.length - 1);
  const tagId: number = e.target.dataset.id ?? '';

  if (correctStringLength > 50) {
    console.error('Error')
  } else {
    console.log(tagId)
  }
}

const handleRemoveTag = (value, id) => {
  console.log('clear', value, id)
};

const changeType = (value: string, id: number) => {
  if (value === 'ldap') {
    console.log('type:', value, id)
    //change password = null;
  }
}

</script>

<template>
  <el-table :data="accountList" class="table" border>

    <el-table-column label="Метки" width="260">
      <template #default="scope" ">
        <el-input-tag @remove-tag="(tag) => handleRemoveTag(tag, scope.row.id)" :data-id="scope.row.id"
        :data-tags="scope.row.tags"
        @keypress="handleKeyInputTags" v-model="scope.row.tags" @blur="handleSaveTag" maxlength="50"
        placeholder="Укажите метки" />
      </template>
    </el-table-column>

    <el-table-column label="Тип записи" width="260">
      <template #default="scope">
        <el-select @change="(value) => changeType(value, scope.row.id)" v-model="scope.row.recordType">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column label="Логин" width="260">
      <template #default="scope">
        <div class="error">
          <el-input min="1" v-model="scope.row.login" placeholder="Введите логин" minlength="1" maxlength="100" />
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Пароль" width="260">
      <template #default="scope">
        <el-input v-if="scope.row.recordType === 'local'" v-model="scope.row.password" min="1" type="password"
          placeholder="Введите пароль" show-password maxlength="100" />
      </template>
    </el-table-column>

    <el-table-column min-width="60" label="">
      <template #default="scope">
        <el-button type="danger" :icon="Delete" circle @click="handleDelete(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>

</template>

<style lang="css" scoped>
.table {
  color: #000000DE;
  width: 100%;
  font-size: 16px;
}

.error {
  border-radius: 4px;
  border: 1px solid #e47673;
}
</style>
