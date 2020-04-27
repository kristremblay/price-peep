<template>
  <v-layout column>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <stock-search class="pt-6" rounded filled />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <StockPriceWidget />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import StockPriceWidget from '~/components/StockPriceWidget'
import StockSearch from '~/components/StockSearch'

export default {
  components: { StockPriceWidget, StockSearch },
  data() {
    return {}
  }
}
</script>
