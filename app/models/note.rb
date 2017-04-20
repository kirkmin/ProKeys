class Note < ActiveRecord::Base
	validates :pitch, :recording, :start, :duration, presence: true

	belongs_to :recording
end
