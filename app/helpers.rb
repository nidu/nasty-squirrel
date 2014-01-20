helpers do
	def parse_id_array(id_array)
		id_array.split(",").collect(&:to_i).select { |x| x != 0 }
	end
end