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
			@keyset = current_user.keysets.find(params[:id])

			if @keyset
				render json: @keyset
			else
				render json: @keyset.errors.full_messages, status: :unprocessable_entity
			end
		end

		def update
			@keyset = current_user.keysets.find(params[:id])
			if @keyset.update(keyset_params)
				render json: @keyset
			else
				render json: { errors: @keyset.errors.full_messages }, status: :unprocessable_entity
			end
		end

		private
		def keyset_params
			params.require(:keyset).permit(:title, :q, :w, :e, :r, :t, :y, :u, :i, :o, :p, :openbracket, :closebracket, :a, :s, :d, :f, :g, :h, :j, :k, :l, :semicolon, :quotation, :z, :x, :c, :v, :b, :n, :m, :comma, :period, :period, :slash)
		end

	end
end