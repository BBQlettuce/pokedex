Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$el.find('.pokemon-list');
    this.$pokeDetail = this.$el.find('.pokemon-detail');
    this.$newPoke = this.$el.find('.new-pokemon');
    this.$toyDetail = this.$el.find('.toy-detail');

    this.pokemon = new Pokedex.Collections.Pokemon();

    this.$pokeList.on("click", "li.poke-list-item", this.selectPokemonFromList.bind(this));

    this.refreshPokemon();
  },

  addPokemonToList: function(pokemon) {
    var $pokeli = $("<li>" + pokemon.get("name") + " -- " + pokemon.get("poke_type") + "</li>");
    $pokeli.addClass("poke-list-item");
    $pokeli.data({id: pokemon.get("id")});
    this.$pokeList.append($pokeli);
    // console.log(pokemon)
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
  },

  renderPokemonDetail: function(pokemon) {
    var $detail = $("<div class='detail'></div>");
    var pokeAttrs = pokemon.attributes;
    console.log(pokeAttrs);
    var $img = $("<img src=" + pokeAttrs.image_url + ">");
    $detail.append($img);

    for (var attr in pokeAttrs) {
      if (attr !== "image_url"){
        $detail.append($("<p>" + attr + ": " + pokeAttrs[attr] + "</p>"));
      }
    }

    this.$pokeDetail.html($detail)
  },

  selectPokemonFromList: function(event) {
    var pokeid = $(event.currentTarget).data("id");
    var chosenPoke = this.pokemon.get(pokeid);
    this.renderPokemonDetail(chosenPoke);
  }

});
