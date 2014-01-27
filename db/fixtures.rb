require_relative '../app/app'

class Fixtures

	def self.clear
		DB[:tags].truncate
		DB[:product_versions].truncate
		DB[:products].truncate
	end

	def self.apply
		# tags
		['Food', 'Leasure', 'Sport', 'Finance', 'Business', 'Space', 'Spicy', 'Media', 'Movie', 'Music', 'Politics', 'Pretty'].each do |title|
			DB[:tags].insert(title: title, description: title)
		end

		# products
		[
			['Anasis', ['1.0.1', '1.15.0', '1.2.0']],
			['EWPlay', ['2014.5.11a', '2013', '2013.0.0.1']],
			['ShaveAndSlice', ['0.0.4', '0.0.4.114', '0.0.5']]
		].each do |product|
			title = product[0]
			versions = product[1]
			product_id = DB[:products].insert(code: title, title: title, description: title)
			DB[:product_versions].insert(product_id: product_id)
			versions.each do |version|
				DB[:product_versions].insert(product_id: product_id, version: version)
			end
		end
	end
end