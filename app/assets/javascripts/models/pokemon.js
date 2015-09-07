Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: '/pokemon',

  toJSON: function() {
    console.log("turned into json")
    return {pokemon: this.attributes};
  }

});
