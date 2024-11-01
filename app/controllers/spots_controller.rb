class SpotsController < ApplicationController
  def index
    @spots = Spot.all
  end

  def new
    @spot = Spot.new
    @spot.images.build
  end

  def create
    @spot = current_user.spots.build(spot_params)
    if @spot.save
      flash[:success] = t('defaults.message.spot_success')
      redirect_to @spot
    else
      flash.now[:danger] = t('defaults.message.invalid')
      render :new
    end
  end

  def show
    @spot = Spot.find(params[:id])
  end

  def edit
  end

  private

  def spot_params
    params.require(:spot).permit(:name, :description, images_attributes: [:id, :name, :name_cache, :_destroy])
  end
end
