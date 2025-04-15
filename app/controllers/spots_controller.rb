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

  def destroy
    if @spot.destroy
      # Ajax想定ならflashやリダイレクトではなく、JSONレスポンスなどにする
      render json: { message: 'Spot was successfully destroyed.' }, status: :ok
    else
      render json: { error: 'Failed to destroy.' }, status: :unprocessable_entity
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
