import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | letters/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:letters/new');
    assert.ok(route);
  });
});
