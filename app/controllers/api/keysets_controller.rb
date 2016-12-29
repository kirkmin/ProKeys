module Api
	class KeysetsController < ApiController
		def create
			@keyset = current_user.keysets.new(keyset_params)
			if @keyset.save
				render json: @keyset
			else
				render json: @keyset.errors.full_messages, status: :unprocessable_entity 
			end
		end

		def destroy
			@keyset = current_user.keysets.find(params[:id])
			@keyset.try(:destroy)
			render json: {}
		end

		def index
			@keysets = current_user.keysets
			render json: @keysets
		end

		def show
			@keyset = Keyset.find(params[:id])

			if @keyset
				render :show
			else
				render json: @keyset.errors.full_messages, status: :unprocessable_entity
			end
		end

		def update
			@keyset = current_user.keysets.find(params[:id])
			if @keyset.update(keyset_params)
				render :show
			else
				render json: @keyset.errors.full_messages, status: :unprocessable_entity
			end
		end

		private
		def keyset_params
			params.require(:keyset).permit(:title)
		end

	end
end