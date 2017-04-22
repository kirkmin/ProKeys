module Api
	class RecordingsController < ApiController
		def create
			@recording = current_user.recordings.new(recording_params)

			if @recording.save
				render json: @recording
			else
				render json: @recording.errors.full_messages, status: :unprocessable_entity
			end
		end

		def destroy
			@recording = current_user.recordings.find(params[:id])
			@recording.try(:destroy)
			render json: {}		
		end

		def index
			@recordings = current_user.recordings
			render json: @recordings
		end

		def show
			@recording = current_user.recordings.find(params[:id])

			if @recording
				render json: @recording, include: :notes
			else
				render json: @recording.errors.full_messages, status: :unprocessable_entity
			end
		end

		def update
			@recording = current_user.recordings.find(params[:id])
			@recording.attributes = recording_params
			if @recording.changed? && @recording.save
				render json: @recording
			else
				render json: { errors: @recording.errors.full_messages }, status: :unprocessable_entity
			end
		end

		private
		def recording_params
			params.require(:keyset).permit(:title)
		end

	end
end