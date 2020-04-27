<template>
  <span>
    <v-icon v-if="change > 0" color="success">mdi-arrow-up</v-icon>
    <v-icon v-else-if="change < 0" color="error">mdi-arrow-down</v-icon>
    <v-icon v-else color="lightAccent">mdi-equal</v-icon>
    {{ after | currency }}
    ( {{ change > 0 ? '+' : '-' }}{{ Math.abs(change) | currency }} )
  </span>
</template>

<script>
export default {
  name: 'StockValue',
  props: {
    after: {
      type: String,
      required: true
    },
    before: {
      type: String,
      required: true
    }
  },
  computed: {
    change() {
      const change = Number(this.after - this.before).toFixed(4)
      return change > 0 ? `+${change}` : change
    }
  }
}
</script>
