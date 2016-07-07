class SessionsController < ApplicationController

	def create
		@user = User.find_by_credentials(params[:user])

		if @user
			sign_in!(@user)
			redirect_to :root
		else
			# flash.now[:errors] = ['Invalid email or password']
			redirect_to :root, flash: {errors: ['Invalid email or password']}
		end
	end

	def destroy
		sign_out!
		redirect_to :root
	end
end
