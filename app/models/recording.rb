class Recording < ActiveRecord::Base
	validates :title, :duration, :user, presence: true
	validates :duration, numericality: { less_than_or_equal_to: 181000 }

	belongs_to :user
	has_many :notes, dependent: :destroy

	def notes_array=(array)
		notes = []
	    array.each do |el|
	    	split_el = el.split(", ")
			notes << Note.create({pitch: split_el[0], start: split_el[1], duration: split_el[2]})
	    end
	    self.notes = notes
	end
end
