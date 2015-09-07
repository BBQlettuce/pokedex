Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$el.find('.pokemon-list');
    this.$pokeDetail = this.$el.find('.pokemon-detail');
    this.$newPoke = this.$el.find('.new-pokemon');
    this.$toyDetail = this.$el.find('.toy-detail');

    this.pokemon = new Pokedex.Collections.Pokemon();
    this.refreshPokemon();
  },

  addPokemonToList: function(pokemon) {
    var $li = $("<li>" + pokemon.get("name") + " -- " + pokemon.get("poke_type") + "</li>");
    $li.addClass("poke-list-item");
    this.$pokeList.append($li);
  },

  refreshPokemon: function() {
    var that = this;
    this.pokemon.fetch({
      success: function(pokedex) {
        pokedex.models.forEach(function(pokemon) {
          this.addPokemonToList(pokemon);
        }.bind(that))
      }
    });
  }

});
