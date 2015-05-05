/**
 * Created by Noxval on 10.04.15.
 */

    /**
     * API:
     *
     * var router = new Router();
     *
     * router.listen();
     *
     * router.on('/some', callback);
     * router.on('/some/:foo/:bar', function(response) {
     *      response.parameters.foo
     *      response.parameters.bar
     *      response.query | {one: 'two', three: 'four'} like ?one=two&three=four
     * });
     *
     * router.set('/foo/bar');
     *
     * @returns {{on: Function, off: Function, routes: *, resetOnReload: Function, reset: Function, listen: Function, back: Function, forward: Function, set: Function}}
     * @constructor
     */

