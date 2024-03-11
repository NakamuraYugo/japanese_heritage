class SpotsController < ApplicationController
  def index
  end

  def new
    @spot = Spot.new
  end

  def confirm
    @spot = current_user.spots.build(spot_params)
    
    if @spot.valid?
      session[:spot_params] = spot_params.to_h
      redirect_to show_confirm_spots_path
    else
      flash.now[:danger] = t('defaults.message.invalid')
      render :new
    end
  end
  
  def show_confirm
    if session[:spot_params].present?
      @spot = current_user.spots.build(session[:spot_params])
    else
      redirect_to new_spot_path, alert: 'セッションがタイムアウトしました。もう一度入力してください。'
    end
  end

  def show
  end

  def edit
  end


  private

  def spot_params
    params.require(:spot).permit(:name, :description, {spot_images: []}, :spot_images_cache)
  end
end
