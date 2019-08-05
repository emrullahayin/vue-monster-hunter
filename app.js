window.onload = function() {
  new Vue({
    el: "#app",
    data: {
      start_game: false,
      my_heart: 100,
      monster_heart: 100,
      logs: []
    },
    methods: {
      attack: function() {
        return this.damage("attack");
      },
      special_attack: function() {
        return this.damage("special");
      },
      heart_up: function() {
        var point = Math.ceil(Math.random() * 10) + 1;
        this.my_heart += point;
        this.add_to_log({
          turn: "p",
          text: "İLK YARDIM (" + point + ")"
        });
      },
      give_up: function() {
        this.my_heart = 0;
        this.end_game("me");
        this.add_to_log({
          turn: "p",
          text: "OYUNCU PES ETTİ (" + me_point + ")"
        });
      },
      damage: function(type) {
        var me_point = Math.ceil(Math.random() * 10);
        var monster_point = Math.ceil(Math.random() * 10);
        if (type === "attack") {
          this.my_heart -= monster_point + 1;
          this.monster_heart -= me_point + 1;
          this.add_to_log({
            turn: "p",
            text: "OYUNCU ATAĞI (" + me_point + ")"
          });
        } else if ("special") {
          this.my_heart -= monster_point;
          this.monster_heart -= me_point + 10;
          this.add_to_log({
            turn: "p",
            text: "ÖZEL OYUNCU ATAĞI (" + parseInt(me_point + 10) + ")"
          });
        }
        this.add_to_log({
          turn: "c",
          text: "CANAVAR ATAĞI (" + monster_point + ")"
        });
      },
      end_game: function(status) {
        this.start_game = false;
        if (status === "me") {
          alert("Oyunu Kaybettin");
        } else if (status === "monster") {
          alert("Oyunu Kazandın");
        }
        this.my_heart = 100;
        this.monster_heart = 100;
        this.logs = [];
      },
      add_to_log: function(log) {
        this.logs.push(log);
      }
    },
    watch: {
      my_heart: function(value) {
        if (value <= 0) {
          this.my_heart = 0;
          this.end_game("me");
        } else if (value >= 100) {
          this.my_heart = 100;
        }
      },
      monster_heart: function(value) {
        if (value <= 0) {
          this.monster_heart = 0;
          this.end_game("monster");
        }
      }
    }
  });
};
