<template>
  <div>
    <a-spin :spinning="isLoading">
      <a-input-search v-model:value="searchValRef" placeholder="请输入包名，如kzx_xxxxx" style="width: 300px"
        @search="onSearch" />
    </a-spin>
  </div>


  <div v-show="showDownload" style="margin-top: 20px;">
  <a-descriptions title="详情信息"  bordered>
    <a-descriptions-item label="包名">{{searchValRef}}</a-descriptions-item>
    <a-descriptions-item label="文件名">{{fileNameRef}}</a-descriptions-item>
    <a-descriptions-item label="上传用户">{{authorRef}}</a-descriptions-item>
    <a-descriptions-item label="下载地址">{{downloadUrlRef}}</a-descriptions-item>
  </a-descriptions>

  <div style="margin-top: 30px;">
    <a-button @click="handleDownload" :loading="isDownload">下载</a-button>
  </div>
  </div>
</template>



<script setup lang="ts">
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';
const searchValRef = ref('')
const downloadUrlRef = ref('')
const fileNameRef = ref('')
const authorRef = ref('')

const isLoading = ref(false)
const isDownload = ref(false)


const onSearch = async (val: string) => {
  const v = val.trim()
  isLoading.value = true
  try {
    const { downloadUrl, fileName, author } = await (window as any).ipc.searchPkg(v)

    if (!downloadUrl) {
      message.error(`搜索失败，请确认包名【${v}】是否正确`)
      return
    }

    downloadUrlRef.value = downloadUrl
    fileNameRef.value = fileName
    authorRef.value = author

  } catch (e) {
    message.error(e.message)
  } finally {
    isLoading.value = false
  }
}

const handleDownload = async () => {
  try {
    isDownload.value = true
    const fileNameDir = fileNameRef.value ? fileNameRef.value.split('.').slice(0, -1) : searchValRef.value
    const data = await (window as any).ipc.downloadPkg(searchValRef.value, fileNameDir)
    if (data) {
      message.success(`下载成功，文件位于目录 "下载->${fileNameDir}"`)
    }
  } catch (e) {
    message.error('下载失败:', e.message)
  } finally {
    isDownload.value = false
  }
}

const showDownload = computed(() => downloadUrlRef.value)


</script>