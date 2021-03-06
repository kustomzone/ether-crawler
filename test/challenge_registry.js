contract('ChallengeRegistry', function(accounts) {
  it("should let you add a challenge", function(done) {
    var cr = ChallengeRegistry.at(ChallengeRegistry.deployed_address);
    var level = Level.at(Level.deployed_address);

    Challenge.new(cr.address, 1, {value: 1000}).
      then(function(challenge) {
        cr.num_challenges.call().
        then(function(result) { assert.equal(result, 1) }).
        then(function() { return challenge.add_level(level.address) }).
        then(function() { return cr.get_all_players.call() }).
        then(function(result) { assert.equal(result[0], accounts[0]) }).
        then(function() { return cr.get_all_num_levels.call() }).
        then(function(result) { assert.equal(result[0], 1) }).
        then(function() { return cr.get_all_bet_values.call() }).
        then(function(result) { assert.equal(result[0], 1000) }).
        then(function() { return cr.get_all_challenges.call() }).
        then(function(result) {
          assert.equal(result[0], challenge.address);
          done();
      }).catch(done);
    }).catch(done);
  });
});
