class CreateKeysets < ActiveRecord::Migration
  def change
    create_table :keysets do |t|
    	t.integer :user_id, null: false
    	t.string :title, null: false
   		t.string :q
		t.string :w
		t.string :e
		t.string :r
		t.string :t
		t.string :y
		t.string :u
		t.string :i
		t.string :o
		t.string :p
		t.string :openbracket
		t.string :closebracket
		t.string :a
		t.string :s
		t.string :d
		t.string :f
		t.string :g
		t.string :h
		t.string :j
		t.string :k
		t.string :l
		t.string :semicolon
		t.string :quotation
		t.string :z
		t.string :x
		t.string :c
		t.string :v
		t.string :b
		t.string :n
		t.string :m
		t.string :comma
		t.string :period
		t.string :slash 

      	t.timestamps null: false
    end

    add_index :keysets, :user_id
  end
end
