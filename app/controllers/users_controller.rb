class UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		respond_to do |format|
			if @user.save
				sign_in!(@user)
				format.js
			else
				flash.now[:errors] = @user.errors.full_messages
				format.js
			end
		end

	end

	private
	def user_params
		params.require(:user).permit(:username, :password)
	end
end