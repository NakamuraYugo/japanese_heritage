class UserInformationsController < ApplicationController
  def show
    @user  = User.find(params[:id])
    @spots = @user.spots
                  .includes(:images)
                  .order(created_at: :desc)
                  .page(params[:page]).per(20)
  end
end
