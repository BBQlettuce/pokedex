json.extract! pokemon, :id, :attack, :defense, :image_url, :moves, :name, :poke_type
json.toys do
  json.array! pokemon.toys do |toy|
    json.partial! 'toys/toy', toy: toy
  end
end
