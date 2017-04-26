class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
    	t.integer :recording_id
    	t.string :pitch, null: false
    	t.integer :start, null: false
    	t.integer :duration, null: false

    	t.timestamps null: false
    end

	add_index :notes, :recording_id
  end
end
