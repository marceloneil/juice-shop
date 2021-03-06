describe('controllers', function () {
    var scope, controller, $httpBackend;

    beforeEach(module('myApp'));
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    describe('UserDetailsController', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('UserDetailsController', {
                '$scope': scope,
                'id': 42
            });
        }));

        it('should be defined', inject(function ($controller) {
            expect(controller).toBeDefined();
        }));

        it('should hold single product with given id', inject(function ($controller) {
            $httpBackend.whenGET('/api/Users/42').respond(200, {data: {email: 'test@juice-sh.op'}});

            $httpBackend.flush();

            expect(scope.user).toBeDefined();
            expect(scope.user.email).toBe('test@juice-sh.op');
        }));

        it('should hold no product if API call fails', inject(function ($controller) {
            $httpBackend.whenGET('/api/Users/42').respond(500);

            $httpBackend.flush();

            expect(scope.user).toBeUndefined();
        }));

    });

});
