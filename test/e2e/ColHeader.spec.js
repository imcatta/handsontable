describe('ColHeader', () => {
  const id = 'testContainer';

  beforeEach(function() {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function() {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should not show col headers by default', () => {
    handsontable();

    expect(spec().$container.find('thead th').length).toEqual(0);
  });

  it('should show col headers if true', () => {
    handsontable({
      colHeaders: true
    });

    expect(spec().$container.find('thead th').length).toBeGreaterThan(0);
  });

  it('should show default columns headers labelled A-(Z * n)', () => {
    const startCols = 5;

    handsontable({
      startCols,
      colHeaders: true
    });

    const ths = getHtCore().find('thead th');
    expect(ths.length).toEqual(startCols);
    expect($.trim(ths.eq(0).text())).toEqual('A');
    expect($.trim(ths.eq(1).text())).toEqual('B');
    expect($.trim(ths.eq(2).text())).toEqual('C');
    expect($.trim(ths.eq(3).text())).toEqual('D');
    expect($.trim(ths.eq(4).text())).toEqual('E');
  });

  it('should show default columns headers labelled A-(Z * n) when columns as an array is present', () => {
    const startCols = 5;

    handsontable({
      startCols,
      colHeaders: true,
      columns: [{}, {}, {}, {}, {}]
    });

    const ths = getHtCore().find('thead th');
    expect(ths.length).toEqual(startCols);
    expect($.trim(ths.eq(0).text())).toEqual('A');
    expect($.trim(ths.eq(1).text())).toEqual('B');
    expect($.trim(ths.eq(2).text())).toEqual('C');
    expect($.trim(ths.eq(3).text())).toEqual('D');
    expect($.trim(ths.eq(4).text())).toEqual('E');
  });

  it('should show default columns headers labelled A-(Z * n) when columns as a function is present', () => {
    const startCols = 5;

    handsontable({
      startCols,
      colHeaders: true,
      columns() {
        return {};
      }
    });

    const ths = getHtCore().find('thead th');
    expect(ths.length).toEqual(startCols);
    expect($.trim(ths.eq(0).text())).toEqual('A');
    expect($.trim(ths.eq(1).text())).toEqual('B');
    expect($.trim(ths.eq(2).text())).toEqual('C');
    expect($.trim(ths.eq(3).text())).toEqual('D');
    expect($.trim(ths.eq(4).text())).toEqual('E');
  });

  it('should show col headers with custom label', () => {
    const startCols = 5;
    handsontable({
      startCols,
      colHeaders: ['First', 'Second', 'Third']
    });

    const ths = getHtCore().find('thead th');
    expect(ths.length).toEqual(startCols);
    expect($.trim(ths.eq(0).text())).toEqual('First');
    expect($.trim(ths.eq(1).text())).toEqual('Second');
    expect($.trim(ths.eq(2).text())).toEqual('Third');
    expect($.trim(ths.eq(3).text())).toEqual('D');
    expect($.trim(ths.eq(4).text())).toEqual('E');
  });

  it('should not show col headers if false', () => {
    handsontable({
      colHeaders: false
    });

    expect(spec().$container.find('th.htColHeader').length).toEqual(0);
  });

  it('should hide columns headers after updateSettings', () => {
    const hot = handsontable({
      startCols: 5,
      colHeaders: true
    });

    expect(getHtCore().find('thead th').length).toEqual(5);
    expect(getTopClone().find('thead th').length).toEqual(5);

    hot.updateSettings({
      colHeaders: false
    });

    expect(getHtCore().find('thead th').length).toEqual(0);
    expect(getTopClone().width()).toEqual(0);
  });

  it('should show/hide columns headers after updateSettings', () => {
    const hot = handsontable({
      startCols: 5,
      colHeaders: true
    });

    expect(getHtCore().find('thead th').length).toEqual(5);
    expect(getTopClone().find('thead th').length).toEqual(5);

    hot.updateSettings({
      colHeaders: false
    });

    expect(getHtCore().find('thead th').length).toEqual(0);
    expect(getTopClone().width()).toEqual(0);

    hot.updateSettings({
      colHeaders: true
    });

    expect(getHtCore().find('thead th').length).toEqual(5);
    expect(getTopClone().width()).toBeGreaterThan(0);

    hot.updateSettings({
      colHeaders: false
    });

    expect(getHtCore().find('thead th').length).toEqual(0);
    expect(getTopClone().width()).toEqual(0);
  });

  it('should show columns headers after updateSettings', () => {
    const hot = handsontable({
      startCols: 5,
      colHeaders: false
    });

    expect(getHtCore().find('thead th').length).toEqual(0);
    expect(getTopClone().find('thead th').length).toEqual(0);

    hot.updateSettings({
      colHeaders: true
    });

    expect(getHtCore().find('thead th').length).toEqual(5);
    expect(getTopClone().find('thead th').length).toEqual(5);
  });

  it('should show new columns headers after updateSettings', () => {
    const hot = handsontable({
      startCols: 3,
      colHeaders: ['A', 'B', 'C']
    });

    const htCore = getHtCore();
    expect(htCore.find('thead th:eq(0)').text()).toEqual('A');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('B');
    expect(htCore.find('thead th:eq(2)').text()).toEqual('C');

    hot.updateSettings({
      colHeaders: ['X', 'Y', 'Z']
    });

    expect(htCore.find('thead th:eq(0)').text()).toEqual('X');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('Y');
    expect(htCore.find('thead th:eq(2)').text()).toEqual('Z');

  });

  it('should be possible to define colHeaders with a function', () => {
    handsontable({
      startCols: 2,
      colHeaders(col) {
        switch (col) {
          case 0:
            return 'One';
          case 1:
            return 'Two';
          default:
            break;
        }
      }
    });

    const htCore = getHtCore();

    expect(htCore.find('thead th:eq(0)').text()).toEqual('One');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('Two');
  });

  it('should be possible to set HTML in colHeaders', () => {
    handsontable({
      startCols: 2,
      colHeaders: ['One <input type="checkbox">', 'Two <input type="checkbox">']
    });

    const htCore = getHtCore();

    expect(htCore.find('thead th:eq(0) input[type=checkbox]').length).toEqual(1);
    expect(htCore.find('thead th:eq(1) input[type=checkbox]').length).toEqual(1);
  });

  it('should be possible to set colHeaders when columns array is present', () => {
    handsontable({
      startCols: 2,
      colHeaders: ['One', 'Two'],
      columns: [
        { type: 'text' },
        { type: 'text' }
      ]
    });

    const htCore = getHtCore();

    expect(htCore.find('thead th:eq(0)').text()).toEqual('One');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('Two');
  });

  it('should be possible to set colHeaders when columns function is present', () => {
    handsontable({
      startCols: 2,
      colHeaders: ['One', 'Two'],
      columns(column) {
        let colMeta = { type: 'text' };

        if ([0, 1].indexOf(column) < 0) {
          colMeta = null;
        }

        return colMeta;
      }
    });

    const htCore = getHtCore();

    expect(htCore.find('thead th:eq(0)').text()).toEqual('One');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('Two');
  });

  it('should be possible to set colHeaders using columns title property', () => {
    handsontable({
      startCols: 2,
      colHeaders: ['One', 'Two'],
      columns: [
        { type: 'text', title: 'Special title' },
        { type: 'text' }
      ]
    });

    const htCore = getHtCore();

    expect(htCore.find('thead th:eq(0)').text()).toEqual('Special title');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('Two');
  });

  it('should be possible to set colHeaders using columns title property when columns is a function', () => {
    handsontable({
      startCols: 2,
      colHeaders: ['One', 'Two'],
      columns(column) {
        let colMeta = { type: 'text' };

        if (column === 0) {
          colMeta.title = 'Special title';
        }
        if ([0, 1].indexOf(column) < 0) {
          colMeta = null;
        }

        return colMeta;
      }
    });

    const htCore = getHtCore();

    expect(htCore.find('thead th:eq(0)').text()).toEqual('Special title');
    expect(htCore.find('thead th:eq(1)').text()).toEqual('Two');
  });

  it('should resize all the column headers in the overlays, according to the other overlays\' height', () => {
    handsontable({
      startCols: 5,
      colHeaders: ['a', 'a', 'a', 'a<BR>a', 'a'],
      fixedColumnsLeft: 2
    });

    const topHeaderExample = $('.ht_clone_top').find('thead tr:first-child th:nth-child(1)'),
      masterHeaderExample = $('.ht_master').find('thead tr:first-child th:nth-child(3)');

    expect(topHeaderExample.height()).toEqual(masterHeaderExample.height());
  });

  it('should allow defining custom column header height using the columnHeaderHeight config option', () => {
    const hot = handsontable({
      startCols: 3,
      colHeaders: true,
      columnHeaderHeight: 40
    });

    hot.render();

    expect(spec().$container.find('th').eq(0).height()).toEqual(40);
  });

  it('should allow defining custom column header heights using the columnHeaderHeight config option, when multiple column header levels are defined', () => {
    const hot = handsontable({
      startCols: 3,
      colHeaders: true,
      columnHeaderHeight: [45, 65],
      afterGetColumnHeaderRenderers(array) {
        array.push((index, TH) => {
          TH.innerHTML = '';

          const div = document.createElement('div');
          const span = document.createElement('span');

          div.className = 'relative';
          span.className = 'colHeader';

          span.innerText = index;

          div.appendChild(span);
          TH.appendChild(div);
        });

        return array;
      }
    });
    hot.render();

    expect(spec().$container.find('.handsontable.ht_clone_top tr:nth-child(1) th:nth-child(1)').height()).toEqual(45);
    expect(spec().$container.find('.handsontable.ht_clone_top tr:nth-child(2) th:nth-child(1)').height()).toEqual(65);
  });
});
