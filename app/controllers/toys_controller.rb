class ToysController < ApplicationController
  def update
  
    @toy = Toy.find(params[:id])
    # fail
    @toy.update(toy_params)
    if @toy.save
      render :show
    end
  end

  def toy_params
    params.require(:toy).permit(:pokemon_id)
  end

end
