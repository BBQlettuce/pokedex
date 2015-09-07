Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$el.find('.pokemon-list');
    this.$pokeDetail = this.$el.find('.pokemon-detail');
    this.$newPoke = this.$el.find('.new-pokemon');
    this.$toyDetail = this.$el.find('.toy-detail');

    this.pokemon = new Pokedex.Collections.Pokemon();

    this.$pokeList.on("click", "li.poke-list-item", this.selectPokemonFromList.bind(this));
    this.$newPoke.on("submit", this.submitPokemonForm.bind(this));

    this.refreshPokemon();
  },

  addPokemonToList: function(pokemon) {
    var $pokeli = $("<li>" + pokemon.get("name") + " -- " + pokemon.get("poke_type") + "</li>");
    $pokeli.addClass("poke-list-item");
    $pokeli.data({id: pokemon.get("id")});
    this.$pokeList.append($pokeli);
  },

  refreshPokemon: function() {
    this.pokemon.fetch({
      success: function(pokedex) {
        pokedex.models.forEach(this.addPokemonToList.bind(this))
      }.bind(this)
    });
  },

  renderPokemonDetail: function(pokemon) {
    var $detail = $("<div class='detail'></div>");
    var pokeAttrs = pokemon.attributes;
    // console.log(pokeAttrs);
    var $img = $("<img src=" + pokeAttrs.image_url + ">");
    $detail.append($img);

    // create a description list
    var $dl = $("<dl></dl>");

    for (var attr in pokeAttrs) {
      if (attr !== "image_url") {
        $dl.append($("<dt>" + attr + "</dt>" + "<dd>" + pokeAttrs[attr] + "</dd>"));
      }
    }

    $detail.append($dl);
    this.$pokeDetail.html($detail)
  },

  selectPokemonFromList: function(event) {
    var pokeid = $(event.currentTarget).data("id");
    var chosenPoke = this.pokemon.get(pokeid);
    this.renderPokemonDetail(chosenPoke);
  },

  createPokemon: function(attributes, callback) {
    var pokeToCreate = new Pokedex.Models.Pokemon();
    pokeToCreate.save(attributes, {
      success: function() {
        debugger;
        this.pokemon.add(pokeToCreate);
        this.addPokemonToList(pokeToCreate);
        callback(pokeToCreate);
      }.bind(this)
    });
  },

  submitPokemonForm: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    // console.log($form.find(":input"));
    var formAttrs = $form.serializeJSON();
    this.createPokemon(formAttrs.pokemon, this.renderPokemonDetail.bind(this));
  }

});
