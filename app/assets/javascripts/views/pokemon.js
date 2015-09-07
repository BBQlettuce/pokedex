Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$('.pokemon-list');
    this.$pokeDetail = this.$('.pokemon-detail');
    this.$newPoke = this.$('.new-pokemon');
    this.$toyDetail = this.$('.toy-detail');

    this.pokemon = new Pokedex.Collections.Pokemon();

    this.$pokeList.on("click", "li.poke-list-item", this.selectPokemonFromList.bind(this));
    this.$pokeDetail.on("click", "li.toy-list-item", this.selectToyFromList.bind(this));
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

    // create a toys list
    var $toys = $("<ul class='toys'></ul>");
    $detail.append($toys);

    // fetch to get toys
    pokemon.fetch({
      success: function(p) {
        p.toys().forEach(this.addToyToList.bind(this));
      }.bind(this)
    });

    this.$pokeDetail.html($detail);
  },

  selectPokemonFromList: function(event) {
    event.preventDefault();
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
  },

  addToyToList: function(toy) {
    // console.log(toy);
    $tli = $("<li class='toy-list-item'><dl>" +
              "<dt>name</dt>" + "<dd>" + toy.get('name') + "</dd>" +
              "<dt>happiness</dt>" + "<dd>" + toy.get('happiness') + "</dd>" +
              "<dt>price</dt>" + "<dd>" + toy.get('price') + "</dd>" +
              "</dl></li>");
    $tli.data({toyID: toy.get("id"), pokemonID: toy.get("pokemon_id")});
    this.$pokeDetail.find(".toys").append($tli);
  },

  renderToyDetail: function(toy, toyid, pokeid) {
    $detail = $("<div class='detail'></div>");
    $toyimg = $("<img src=" + toy.get("image_url") + ">");
    $detail.append($toyimg);

    // create select box
    $selectBox = $("<select></select>");
    this.pokemon.fetch({
      success: function(pokedex) {
        pokedex.models.forEach(function(pokemon) {
          var $option;
          if (pokemon.id === pokeid) {
            $option = $("<option selected></option>");
          }
          else {
            $option = $("<option></option>");
          }
          $option.val(pokemon.id);
          $option.text(pokemon.get('name'));
          $selectBox.append($option);
        })
      }
    });

    this.$toyDetail.html($detail);
    this.$toyDetail.append($selectBox);
  },

  selectToyFromList: function(event) {
    event.preventDefault();
    var toyid = $(event.currentTarget).data("toyID");
    var pokeid = $(event.currentTarget).data("pokemonID");
    var toys = this.pokemon.get(pokeid).toys();
    var chosenToy = toys.get(toyid);

    this.renderToyDetail(chosenToy, toyid, pokeid);
  }
});
