<template>
  <a-input-search
    v-model:value="searchVal"
    placeholder="input search text"
    style="width: 200px"
    @search="onSearch"
  />
</template>



<script setup lang="ts">
  import {ref} from 'vue';
  const searchVal = ref('')

  const onSearch = async (val: string) => {
    const v = val.trim()
    const { downloadUrl, fileName, author } = await (window as any).ipc.searchPkg(v)
    console.log(downloadUrl, fileName, author);
    // if (!downloadUrl) {

    // }
  }
</script>