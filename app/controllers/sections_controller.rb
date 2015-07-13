class SectionsController < ApplicationController
  def index
    render json: Section.all.order(created_at: :asc).to_json
  end

  def create
    render json: Section.create(section_params).to_json
  end

  def update
    render json: Section.find(params[:id]).update(section_params)
  end

  def destroy
    render json: Section.find(params[:id]).destroy
  end

  private
  def section_params
    params.require(:section).permit(:section_type, :content)
  end
end
