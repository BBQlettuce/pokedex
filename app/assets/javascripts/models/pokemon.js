Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: '/pokemon',

  toys: function() {
    if (this._toys === undefined) {
      this._toys = new Pokedex.Collections.Toys();
    };
    return this._toys;
  },

  parse: function(payload) {
    if (payload.toys) {
      this.toys().set(payload.toys);
      delete(payload.toys);
    }
    return payload;
  },

  toJSON: function() {
    // console.log("turned into json")
    return {pokemon: this.attributes};
  }

});
