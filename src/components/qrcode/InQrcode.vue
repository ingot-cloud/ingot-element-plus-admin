<template>
  <div v-html="value"></div>
</template>
<script setup lang="ts">
import type { LineOptions, RoundOptions } from "./exported";
import type { PropType } from "vue";
import {
  QrcodeType,
  encodeData,
  rendererLine,
  rendererRound,
} from "./exported";

const props = defineProps({
  type: {
    type: Number as PropType<QrcodeType>,
    default: QrcodeType.Round,
  },
  options: {
    type: Object as PropType<LineOptions | RoundOptions>,
    required: true,
  },
});

const value = ref("");
watch(
  () => props.type,
  (type) => {
    switch (type) {
      case QrcodeType.Line:
        value.value = rendererLine(encodeData(props.options as LineOptions));
        break;
      case QrcodeType.Round:
        value.value = rendererRound(encodeData(props.options as RoundOptions));
        break;
    }
  },
  {
    immediate: true,
  }
);
</script>
