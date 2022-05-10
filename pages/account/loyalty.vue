<template>
  <div style="background-color: white">
    <div class="container-fluid my-account pt-5">
      <div class="row">
        <div class="col-md-12">
          <div
            class="success_message"
            v-text="this.$root.success_message"
            v-if="this.$root.success_message != ''"
          ></div>
          <div
            class="error_message"
            v-text="this.$root.error_message"
            v-if="this.$root.error_message != ''"
          ></div>
        </div>
        <div class="col-md-3">
          <sidebar title="credit"></sidebar>
        </div>

        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              <div class="content-box">
                <div class="">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        class="card text-center p-5"
                        style="box-shadow: 2px 2px 4px 1px #ccc"
                      >
                        <p
                          style="
                          
                            text-transform: uppercase;
                            font-size: 13px;
                            margin: 0;
                          "
                        >
                          Your Credit Balance
                        </p>
                        <p
                          style="font-size: 30px; margin: 0; font-weight: bold"
                        >
                          <span> ₹ </span> {{ total   }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="total > 0">
              <div class="row mt-4">
                <div class="col-md-12">
                  <div class="content-box">
                    <div class="row">
                      <table class="table order-table store">
                        <thead>
                          <tr>
                            <th style="white-space: nowrap">S.No</th>
                            <th style="white-space: nowrap">Date</th>
                            <th style="white-space: nowrap">Order_id</th>
                            <th style="white-space: nowrap">Description</th>
                            <th style="white-space: nowrap">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(log, index) in transactions" :key="index">
                            <td class="se-number">{{ index + 1 }}</td>
                            <td class="order-date">
                              {{ log.created_at | dateFormat }}
                            </td>
                            <td class="order_id" v-if="log.quote !== null">
                              {{ log.quote.order_increment_id }}
                            </td>
                            <td
                              class="des"
                              v-if="log.is_credit == 0 && log.quote !== null"
                            >
                              Paid in {{ log.quote.order_increment_id }}
                            </td>
                            <td
                              class="des"
                              v-if="log.is_credit == 1 && log.quote !== null"
                            >
                              Added in exchange of{{
                                log.quote.order_increment_id
                              }}
                            </td>
                            <td class="amount">
                              {{ log.is_credit == 0 ? "-" : "+" }}
                              {{ log.credits_exchanged   }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sidebar from "./sidebar.vue";
export default {
  components: {
    sidebar
  },
  name: "order",
  data() {
    return {
      total: 0
    };
  },
  mounted() {
    this.storeCredits();
    this.storeLogs();
  },
  created() {},
  methods: {
    dateFormat(dt) {
      if (!dt) {
        return "--";
      }
      let date = dt.split("-");
      let time = dt.split(' ')
      let parts = time[0].split("-");
      let timeSlot = time[1].split(":")
      var slot
      if(timeSlot[0] > 11){
        slot = 'pm'
      }else{
        slot = 'am'
      }
      var months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };
      return parts[2] + " " + months[parts[1]] + " " + parts[0] + " " + timeSlot[0] + ':' + timeSlot[1] + slot;
    },
    storeCredits() {
      var form = new FormData();
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.api_url +
            "/api/cart/v1/customer/store-credits",
          form
        )
        .then(response => {
          this.total = response.data.data.credits;
        });
    },
    storeLogs() {
      var form = new FormData();
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.api_url +
            "/api/cart/v1/customer/store-credits-logs",
          form
        )
        .then(response => {
          this.transactions = response.data.data.logs.data;
        });
    }
  }
};
</script>
<style scoped></style>
