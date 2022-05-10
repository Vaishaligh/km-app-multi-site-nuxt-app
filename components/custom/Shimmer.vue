<template>
  <div class="shimmer animate" style="{styleData}"></div>
</template>

<script>
export default {
  name: "Shimmer"
}
</script>

<style scoped>
.shimmer {
  height: 10px;
  background: #777;
  margin-top: 20px;
}

@keyframes fullView {
  100% {
    width: 100%;
  }
}

.animate {
  animation : shimmer 2s infinite linear;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>
