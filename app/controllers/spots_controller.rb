class SpotsController < ApplicationController
  def index
  end

  def new
    @spot = Spot.new
  end

  def create
    @spot = current_user.spots.build(spot_params)

    if @spot.save
      redirect_to @spot, success: t('defaults.message.created', item: Spot.model_name.human)
    else
      flash.now[:danger] = t('defaults.message.not_created', item: Spot.model_name.human)
      render :new
    end
  end

  def show
  end

  def edit
  end


  private

  def spot_params
    params.require(:spot).permit(:name, :intrduction, :spot_image)
  end
end
