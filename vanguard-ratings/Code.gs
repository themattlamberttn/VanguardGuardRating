// VANGUARD SECURITY — Guard Ratings
// Simple version: guards and ratings only

function doGet(e) {
  try {
    const quarter = e.parameter.quarter || 'Q1 2026';
    const sheet = getSheet(quarter);
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return respond({ guards: [] });
    const guards = [];
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (!r[0]) continue;
      guards.push({
        name: r[0], role: r[1],
        ratings: {
          punctuality:     Number(r[2]) || 0,
          professionalism: Number(r[3]) || 0,
          reliability:     Number(r[4]) || 0,
          workEthic:       Number(r[5]) || 0
        },
        teamPerf: Number(r[6]) || 0,
        notes: r[7] || '',
        coaching: safeJson(r[8])
      });
    }
    return respond({ guards });
  } catch(e) {
    return respond({ error: e.toString() });
  }
}

function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents);

    if (p.action === 'init') {
      const sheet = getSheet(p.quarter);
      const data = sheet.getDataRange().getValues();
      const existing = new Set(data.slice(1).map(r => r[0]));
      const toAdd = (p.guards || []).filter(g => !existing.has(g.name));
      toAdd.forEach(g => sheet.appendRow([g.name, g.role, '', '', '', '', '', '', '[]']));
      return respond({ ok: true, added: toAdd.length });
    }

    if (p.action === 'save') {
      const sheet = getSheet(p.quarter);
      const g = p.guard;
      const row = [
        g.name, g.role,
        g.ratings.punctuality || '',
        g.ratings.professionalism || '',
        g.ratings.reliability || '',
        g.ratings.workEthic || '',
        g.teamPerf || '',
        g.notes || '',
        JSON.stringify(g.coaching || [])
      ];
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === g.name) {
          sheet.getRange(i + 1, 1, 1, 9).setValues([row]);
          return respond({ ok: true });
        }
      }
      sheet.appendRow(row);
      return respond({ ok: true });
    }

    if (p.action === 'clearAll') {
      const sheet = getSheet(p.quarter);
      const last = sheet.getLastRow();
      if (last > 1) sheet.getRange(2, 3, last - 1, 5).clearContent();
      return respond({ ok: true });
    }

    if (p.action === 'delete') {
      const sheet = getSheet(p.quarter);
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][0] === p.name) { sheet.deleteRow(i + 1); break; }
      }
      return respond({ ok: true });
    }

    return respond({ error: 'Unknown action' });
  } catch(e) {
    return respond({ error: e.toString() });
  }
}

function getSheet(quarter) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = (quarter || 'Q1 2026').replace(/[^a-zA-Z0-9 ]/g, '').trim().slice(0, 30);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(['Name','Role','Punctuality','Professionalism','Reliability','Work Ethic','Team Perf','Notes','Coaching']);
    sheet.getRange(1,1,1,9).setFontWeight('bold').setBackground('#003087').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function safeJson(val) {
  try { return JSON.parse(val || '[]'); } catch(e) { return []; }
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
