describe('controllers', function () {
    var scope, location, controller;

    beforeEach(module('myApp'));

    describe('SearchController', function () {
        beforeEach(inject(function ($rootScope, $location, $controller) {
            scope = $rootScope.$new();
            location = $location;
            controller = $controller('SearchController', {
                '$scope': scope
            });
        }));

        it('should be defined', inject(function ($controller) {
            expect(controller).toBeDefined();
            expect(scope.search).toBeDefined();
        }));

        it('forwards to search result with search query as URL parameter', inject(function ($controller) {
            scope.searchQuery = 'lemon juice';
            scope.search();
            expect(location.path()).toBe('/search');
            expect(location.search()).toEqual({q: 'lemon juice'});
        }));

        it('forwards to search result with empty search criteria if no search query is present', inject(function ($controller) {
            scope.searchQuery = undefined;
            scope.search();
            expect(location.path()).toBe('/search');
            expect(location.search()).toEqual({q: ''});
        }));

    });

});
