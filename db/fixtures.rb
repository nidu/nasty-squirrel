require_relative '../app/app'

module Fixtures
	# tags
	Tag.delete_all

	['Food', 'Leasure', 'Sport', 'Finance', 'Business', 'Space', 'Spicy', 'Media', 'Movie', 'Music', 'Politics', 'Pretty'].each do |title|
		Tag.create(title: title, description: title)
	end

	# products
	Product.delete_all
	ProductVersion.delete_all

	[
		['Anasis', ['1.0.1', '1.15.0', '1.2.0']],
		['EWPlay', ['2014.5.11a', '2013', '2013.0.0.1']],
		['ShaveAndSlice', ['0.0.4', '0.0.4.114', '0.0.5']]
	].each do |product|
		title = product[0]
		versions = product[1]
		p = Product.new(code: title, title: title, description: title)
		p.versions.build
		versions.each do |version|
			p.versions.build(version: version)
		end
		p.save
	end
end