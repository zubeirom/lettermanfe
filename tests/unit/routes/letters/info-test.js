import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | letters/info', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:letters/info');
    assert.ok(route);
  });
});
