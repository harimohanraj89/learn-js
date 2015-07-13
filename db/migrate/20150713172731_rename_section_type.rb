class RenameSectionType < ActiveRecord::Migration
  def change
    rename_column :sections, :sectionType, :section_type
  end
end
