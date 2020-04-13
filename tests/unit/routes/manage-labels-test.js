import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | manage-labels', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:manage-labels');
    assert.ok(route);
  });
});
