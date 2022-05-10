<template>
  <span>( ₹{{ count }} )</span>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      count: "",
    };
  },
  async beforeMount() {},
  async mounted() {
    var form = new FormData();
    form.append("customer_id", this.$store.state.list.customer_id);
    form.append("customer_session", this.$store.state.list.customer_session);
    axios
      .post(
        this.$store.state.list.api_url + "/api/cart/v1/customer/store-credits",
        form
      )
      .then((response) => {
        this.count = response.data.data.credits;
      });
  },
  methods: {},
};
</script>
