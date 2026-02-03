<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAccountsStore } from '../stores/accounts';
import { EVENT_CODE } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);

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

const saveChangeInput = (id: number, field: string, value: string) => {
  const isValid = value.length > 0 && value.length < 101;

  if (isValid) {
    accountsStore.saveAccountField(id, field, value);
  } else {
    accountsStore.activeError(id, field);
  }
};

const changeType = (value: string, id: number) => {
  accountsStore.saveAccountField(id, 'recordType', value);

  if (value === 'ldap') {
    accountsStore.resetPassword(id);
  }
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

const handleChangeTags = (id: number, tags: string[]) => {
  const totalChar = tags.reduce((acc, el) => acc + el.length, 0);

  const isValid = totalChar <= 50;

  if (isValid) {
    accountsStore.saveAccountField(id, 'tags', tags);
  } else {
    accountsStore.activeError(id, "tags");
  }
};

</script>

<template>
  <el-table :data="accounts" class="table" border>

    <el-table-column label="Метки" width="260">
      <template #default="scope" ">
        <div :class="scope.row.errorFields.includes('tags') ? 'error' : ''">
        <el-input-tag @change="(tags) => handleChangeTags(scope.row.id, tags)"
        @keypress="handleKeyInputTags" v-model="scope.row.tags"
        maxlength="50" placeholder="Укажите метки" />
        </div>
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
        <div :class="scope.row.errorFields.includes('login') ? 'error' : ''">
          <el-input @blur="saveChangeInput(scope.row.id, 'login', scope.row.login)" min="1" v-model="scope.row.login"
            placeholder="Введите логин" minlength="1" maxlength="100" />
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Пароль" width="260">
      <template #default="scope">
        <div :class="scope.row.errorFields.includes('password') ? 'error' : ''">
          <el-input @blur="saveChangeInput(scope.row.id, 'password', scope.row.password)"
            v-if="scope.row.recordType === 'local'" v-model="scope.row.password" min="1" type="password"
            placeholder="Введите пароль" show-password maxlength="100" />
        </div>
      </template>
    </el-table-column>

    <el-table-column min-width="60" label="">
      <template #default="scope">
        <el-button type="danger" :icon="Delete" circle @click="accountsStore.removeAccount(scope.row.id)" />
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
  animation: errorAnimation 2s linear 0s infinite normal forwards;
}

@keyframes errorAnimation {

  0% {
    box-shadow: 1px 3px 2px 3px #e47673;
  }

  70% {
    box-shadow: 1px 1px 3px 1px #e47673;
  }


  100% {

    box-shadow: 1px 1px 5px 1px transparent;
  }
}
</style>
