class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :sectionType
      t.text :content

      t.timestamps
    end
  end
end
