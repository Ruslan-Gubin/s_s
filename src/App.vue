<script setup>
import Hint from '../components/Hint.vue';
import Accounts from '../components/Accounts.vue';

const addNewAccount = () => {
  console.log('add new account')
}

</script>

<template>
  <section class="wrapper">
    <header class="header">
      <el-text class=" title" size="large">Учетные записи</el-text>
      <el-button size="large" type="primary">Добавить</el-button>
    </header>

    <div class="content">
      <Hint label="Метки" text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" />
      <Accounts />
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
  padding-block: 60px;
}

.header {
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-wrap: wrap;
    row-gap: 24px;
  }
}

.title {
  font-size: 40px;
  line-height: 40px;
  margin: 0;
  color: #000000DE;
  font-weight: 600;
}

.content {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
</style>
