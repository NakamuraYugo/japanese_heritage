class SpotsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  before_action :set_spot, only: [:show, :edit, :update]
  before_action :require_owner!, only: [:edit, :update]

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
  end

  def edit
  end

  def update
    if @spot.update(spot_params)
      flash[:notice] = t('defaults.message.spot_update')
      redirect_to @spot
    else
      flash.now[:danger] = t('defaults.message.invalid')
      render :edit
    end
  end


  private

  def set_spot
    @spot = Spot.find(params[:id])
  end

  def require_owner!
    unless @spot.user_id == current_user.id
      flash[:alert] = t('defaults.message.spot_not_owner')
      redirect_to root_path
    end
  end

  def spot_params
    params.require(:spot).permit(:name, :description, images_attributes: [:id, :name, :name_cache, :_destroy])
  end
end
