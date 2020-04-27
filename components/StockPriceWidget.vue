<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="pa-3">
          <v-card-title
            v-if="items"
            class="display-3 secondary--text pa-5"
            v-text="selectedStock"
          />
          <v-card-title v-else>
            No data yet.
          </v-card-title>
          <v-card-subtitle v-if="items" class="accent--text pl-6">
            <StockValue
              :before="todaysPrices.open"
              :after="todaysPrices.close"
            />
          </v-card-subtitle>
          <v-card-text>
            <line-chart
              :chart-data="chartData"
              :options="chartOptions"
            ></line-chart>
          </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          class="elevation-1"
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
        >
          <template v-slot:item.open="{ item }">
            {{ item.open | currency }}
          </template>
          <template v-slot:item.high="{ item }">
            {{ item.high | currency }}
          </template>
          <template v-slot:item.low="{ item }">
            {{ item.low | currency }}
          </template>
          <template v-slot:item.close="{ item }">
            <StockValue :before="item.open" :after="item.close" />
          </template>
          <template v-slot:item.volume="{ item }">
            {{ Number(item.volume).toLocaleString() }}
          </template>
        </v-data-table>
        <v-snackbar :value="isInvalidStock" vertical>
          Invalid stock symbol.
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import StockValue from '~/components/StockValue'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'StockPriceWidget',

  components: {
    StockValue,
    LineChart
  },

  data() {
    return {
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Open', value: 'open' },
        { text: 'High', value: 'high' },
        { text: 'Low', value: 'low' },
        { text: 'Close', value: 'close' },
        { text: 'Volume', value: 'volume' }
      ],
      itemsPerPage: 5,
      stockSearch: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0,
            borderWidth: 2
          }
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      isInvalidStock: 'stocks/getInvalidStock',
      selectedStock: 'stocks/getSelectedStock',
      selectedStockCurrentPrice: 'stocks/getSelectedStockCurrentPrice',
      items: 'stocks/getSelectedStockItems',
      isFetching: 'stocks/getIsFetchingStock'
    }),
    chartData() {
      const {
        primary,
        secondary,
        success,
        warning
      } = this.$vuetify.theme.themes.light
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Open',
            borderColor: secondary,
            pointBackgroundColor: 'white',
            pointBorderColor: '#249EBF',
            data: []
          },
          {
            label: 'High',
            backgroundColor: 'transparent',
            borderColor: success,
            pointBackgroundColor: 'white',
            pointBorderColor: '#249EBF',
            data: []
          },
          {
            label: 'Low',
            backgroundColor: 'transparent',
            borderColor: warning,
            pointBackgroundColor: 'white',
            pointBorderColor: '#249EBF',
            data: []
          },
          {
            label: 'Close',
            backgroundColor: primary,
            borderColor: primary,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: []
          }
        ]
      }

      if (this.items) {
        this.items.forEach((item) => {
          chartData.labels = [item.date, ...chartData.labels]
          chartData.datasets[0].data = [
            item.open,
            ...chartData.datasets[0].data
          ]
          chartData.datasets[1].data = [
            item.high,
            ...chartData.datasets[1].data
          ]
          chartData.datasets[2].data = [item.low, ...chartData.datasets[2].data]
          chartData.datasets[3].data = [
            item.close,
            ...chartData.datasets[3].data
          ]
        })
      }

      return chartData
    },
    todaysPrices() {
      if (this.items) {
        return this.items[0]
      }

      return null
    }
  }
}
</script>
