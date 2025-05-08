class SpotsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_spot, only: [:show, :edit, :update, :destroy]
  before_action :require_owner!, only: [:edit, :update, :destroy]

  def index
    @q = Spot.ransack(params[:q])
    @spots = @q.result(distinct: true)
             .includes(:images)
             .page(params[:page])
             .per(20)
  end

  def new
    @spot = Spot.new
    @spot.images.build
  end

  def create
    @spot = current_user.spots.build(spot_params)
    if @spot.save
      redirect_to @spot,
                  notice: t('defaults.message.spot_success')
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
      redirect_to @spot,
                  notice: t('defaults.message.spot_update')
    else
      flash.now[:danger] = t('defaults.message.invalid')
      render :edit
    end
  end

  def destroy
    if @spot.destroy
      render json: { message: 'Spot was successfully destroyed.' }, status: :ok
    else
      render json: { error: 'Failed to destroy.' }, status: :unprocessable_entity
    end
  end

  def destroy_multiple
    current_user.spots.where(id: params[:spot_ids]).destroy_all
    redirect_to user_information_path(current_user),
                notice: t('defaults.message.spots_deleted')
  end

  private

  def set_spot
    @spot = Spot.find(params[:id])
  end

  def require_owner!
    redirect_to root_path,
                alert: t('defaults.message.spot_not_owner')
      unless @spot.user_id == current_user.id
  end

  def spot_params
    params.require(:spot).permit(:name, :description, images_attributes: [:id, :name, :name_cache, :_destroy])
  end
end
