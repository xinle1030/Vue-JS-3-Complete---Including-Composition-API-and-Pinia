<template>
  <section class="score">
    Player <span>{{ this.win_count }}</span> x
    <span>{{ this.lose_count }}</span> Computer
  </section>
</template>

<script>
// pass data attribute to component using props
export default {
    props:{
        win_count: Number,
        lose_count: Number
    }
};
</script>

<style lang="scss">
section.score {
  border-bottom: 1px solid black;
  padding: 24px;
  font-size: 18px;

  span {
    padding: 8px;
    font-weight: bold;
    border: 1px solid black;
  }
}
</style>
