module Api
	class NotesController < ApiController
		def create
			@recording = current_user.recordings.find([:recording_id])
			@note = @recording.notes.new(note_params)
			if @note.save
				render json: @note
			else
				render json: @note.errors.full_messages, status: :unprocessable_entity 
			end
		end

		def destroy
			@note = Note.find(params[:id])
			@note.try(:destroy)
			render json: {}
		end

		private
		def note_params
			params.require(:note).permit(:pitch, :start, :duration)
		end

	end
end