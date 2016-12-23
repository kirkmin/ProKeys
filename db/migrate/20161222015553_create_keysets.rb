class CreateKeysets < ActiveRecord::Migration
  def change
    create_table :keysets do |t|

      t.timestamps null: false
    end
  end
end
