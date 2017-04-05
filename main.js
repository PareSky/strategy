window.onload = function(){
  app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      member: [],
      chance: 0.7,
      score: [0,0,0,0],
      rounds: 300
    },
    computed: {
    // a computed getter
      membersCount: function () {
        // `this` points to the app instance
        return this.member.length;
      }
  }
  })

  app.score = [0,0,0,0];
  win = -1;
  round = {
    wills : [],
    sum: 0,
    init : function(){
      win = -1;
      round.wills = [];
      round.sum = 0;
      round.toEnd = function(){};
      round.toEnd1 = function(){};
    },
    start: function(){
      console.log('start');
      com1 = parseInt(4*Math.random());
      com2 = parseInt(4*Math.random());
      console.log(com1+1,'vs',com2+1);
      app.member[com1]();
      app.member[com2]();
    },
    toEnd : function(){},
    toEnd1 : function(){},
    end : function(){
      round.countWill();
      // console.log('sum:'+ round.sum);
      if (win==-2) {
        app.score[com1] += 5;
        app.score[com2] += 5;
        app.score[3]-=5;
        return;
      }
      if (round.sum==0) {
        app.score[com1] += 4;
        app.score[com2] += -1;
      } else if(round.sum==1){
        win = round.wills.indexOf(1);
        if (win==0) {
          app.score[com1] += 5;
        } else {
          app.score[com2] += 5;
        }
      }else if(round.sum>1){
        app.score[com1] += 2;
        app.score[com2] += -3;
      }
    },
    countWill: function(){
      round.sum = 0;
      for (var will in round.wills) {
        round.sum += round.wills[will];
      }
      return round.sum;
    }
  }

  app.member.push(goat = function(){
    // console.log('goat')
    round.wills.push(0);
    round.toEnd = function(){
      if (round.countWill()>0) {
        round.wills.push(1);
      }
    }
  })
  app.member.push(hawk = function(){
    // console.log('hawk')
    round.wills.push(1);
  })
  app.member.push(pigeon = function() {
    // console.log('pigeon')
    round.wills.push(0);
  })
  app.member.push(fox = function() {
  //  console.log('fox')
    round.wills.push(1);
    round.toEnd1 = function(){
      if (round.countWill()>1) {
        win=-2;
      }
    }
  })

  for (var i = 0; i < app.rounds; i++) {
    round.init();
    round.start();
    round.toEnd();
    round.toEnd1();
    round.end();
    console.log('gaot,hawk,pigeon,fox:');
    console.log(app.score);
  }
}
