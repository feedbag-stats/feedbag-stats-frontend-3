<template>
  <div class="hamburger">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<script>
export default {
  name: "Hamburger",
}
</script>

<style scoped lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~bootstrap/scss/mixins";

.hamburger {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40px;
  height: 20px;

  margin: 1rem 0 1rem 5px;

  @include media-breakpoint-down(sm) {
    margin: 1rem 0 1rem auto;
  }
}

.active .bar,
.navbar-dark .bar {
  background-color: $white;
}

.bar {
  height: 2px;
  background-color: $black;
  transition: all 0.5s;
  border-radius: 2px;

  &:nth-child(1) {
    width: 75%;
    .active & {
      transform: translateY(calc(10px - 1px)) rotate(45deg); /* 10 = height / 2 */
    }
  }

  &:nth-child(2) {
    width: 75%;
    transform: translateX(0);
    .active & {
      opacity: 0;
      transform: translateX(50px) !important;
    }
  }

  &:nth-child(3) {
    width: 75%;
    .active & {
      transform: translateY(calc(-10px + 1px)) rotate(-45deg); /* 10 = height / 2 */
    }
  }

}
</style>
