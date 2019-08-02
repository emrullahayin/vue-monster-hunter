window.onload = function() {
  new Vue({
    el: "#app",
    data: {
      start_game: false,
      my_heart: 100,
      monster_heart: 100
    },
    methods: {
      attack: function() {},
      special_attack: function() {},
      heart_up: function() {},
      give_up: function() {}
    }
  });
};
