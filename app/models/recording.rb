class Recording < ActiveRecord::Base
	validates :title, :user, presence: true

	belongs_to :user
	has_many :notes, dependent: :destroy
end
