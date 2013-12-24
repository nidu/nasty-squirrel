describe('filter', function() {
  beforeEach(module('app'));

  describe('reverse', function() {
    it('should reverse a string', inject(function(reverseFilter) {
      expect(reverseFilter('abc')).toEqual('cbadq');
    }))
  })
})