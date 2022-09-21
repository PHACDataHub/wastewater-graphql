import { QuerySet } from './index';

interface KnexExpect {
  table: string;
  where?: [
    string | string[],
    string | string[],
    (string | number | (string | number)[])?
  ];
}

function MockKnex(expected: KnexExpect) {
  this.expected = expected;

  this.calls = {
    select: 0,
    from: 0,
    where: 0,
  };

  this.select = select.bind(this);
  function select(args) {
    this.calls.select += 1;
    expect(args).toEqual('*');
    return this;
  }

  this.from = from.bind(this);
  function from(table) {
    this.calls.from += 1;
    expect(table).toEqual(this.expected.table);
    return this;
  }

  this.where = where.bind(this);
  function where(a, b, c) {
    this.calls.where += 1;
    const [x, y, z] = this.expected.where || [null, null, null];
    expect(a).toEqual(Array.isArray(x) ? x.shift() : x);
    expect(b).toEqual(Array.isArray(y) ? y.shift() : y);

    if (
      typeof z !== 'undefined' &&
      (!Array.isArray(z) ||
        (Array.isArray(z) && z.length > 0 && typeof z !== 'undefined'))
    )
      expect(c).toEqual(Array.isArray(z) ? z.shift() : z);
    return this;
  }
}

const tableName = 'samples';

describe('QuerySet', () => {
  it('can be constructed', () => {
    const k = new MockKnex({ table: tableName });
    new QuerySet(k, tableName);
    expect(k.calls.select).toEqual(1);
    expect(k.calls.from).toEqual(1);
  });
  describe('Standard Filters', () => {
    it('handles `is`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', 'testing 123'],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { is: 'testing 123' } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `contains`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', 'like', '%testing 123%'],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { contains: 'testing 123' } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `startsWith`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', 'like', 'testing 123%'],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { startsWith: 'testing 123' } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `endsWith`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', 'like', '%testing 123'],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { endsWith: 'testing 123' } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `greaterThan`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', '>', 4],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { greaterThan: 4 } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `lesserThan`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', '<', 3],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { lesserThan: 3 } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `greaterOrEqualThan`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', '>=', 2],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { greaterOrEqualThan: 2 } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles `lesserOrEqualThan`', () => {
      const k = new MockKnex({
        table: tableName,
        where: ['field', '<=', 1],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { lesserOrEqualThan: 1 } });
      expect(k.calls.where).toEqual(1);
    });
    it('handles simultaneous filters', () => {
      const k = new MockKnex({
        table: tableName,
        where: [
          ['field', 'field'],
          ['>', '<'],
          [1, 5],
        ],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field: { greaterThan: 1, lesserThan: 5 } });
      expect(k.calls.where).toEqual(2);
    });
    it('handles filtering multiple fields simultaneously', () => {
      const k = new MockKnex({
        table: tableName,
        where: [
          ['field1', 'field2'],
          ['>', '<'],
          [1, 5],
        ],
      });
      const q = new QuerySet(k, tableName);
      q.applyFilter({ field1: { greaterThan: 1 }, field2: { lesserThan: 5 } });
      expect(k.calls.where).toEqual(2);
    });
  });
});
