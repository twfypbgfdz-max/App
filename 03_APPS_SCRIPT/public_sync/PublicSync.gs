const PUBLIC_SYNC_VERSION = '16.0';
const PIN_HASH_PREFIX = 'pb-public-friend-test-v1:';
const DEFAULT_PLAN = 'friend'; // Geschlossene Freunde-Testphase. Fuer offene Public-Phase auf "free" aendern.
const DEFAULT_STATUS = 'active';

const SHEETS = {
  USERS: 'Users',
  CLOUD_DATA: 'CloudData',
  LOGS: 'Logs',
  APP_CONFIG: 'AppConfig'
};

const HEADERS = {
  Users: ['userId', 'displayName', 'pinHash', 'plan', 'status', 'createdAt', 'lastLogin', 'note'],
  CloudData: ['userId', 'dataKey', 'payloadJson', 'updatedAt'],
  Logs: ['timestamp', 'level', 'userId', 'action', 'message'],
  AppConfig: ['key', 'value', 'updatedAt']
};

function setupPublicMasterSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(function(name) {
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    ensureHeader_(sheet, HEADERS[name]);
    try { sheet.setFrozenRows(1); } catch (e) {}
  });
  ensureAppConfig_('maintenanceMode', 'false');
  ensureAppConfig_('publicSignupEnabled', 'true');
  ensureAppConfig_('minAppVersion', '16.0');
  logEvent('info', '', 'setupPublicMasterSheet', 'Public master sheet setup checked');
  return ok_({ version: PUBLIC_SYNC_VERSION });
}

function createOrLoginUser(displayName, pin) {
  setupPublicMasterSheet();
  const cleanName = sanitizeText_(displayName || 'Friend', 40);
  validatePin_(pin);
  const users = getSheet_(SHEETS.USERS);
  const values = getRows_(users);
  const pinHash = hashPin_(pin);
  const existingByName = values.find(function(row) {
    return String(row[1] || '').toLowerCase() === cleanName.toLowerCase();
  });
  if (existingByName) return loginUser(existingByName[0], pin);

  const now = isoNow_();
  const user = {
    userId: newUserId_(),
    displayName: cleanName,
    plan: DEFAULT_PLAN,
    status: DEFAULT_STATUS,
    createdAt: now,
    lastLogin: now,
    note: ''
  };
  users.appendRow([user.userId, user.displayName, pinHash, user.plan, user.status, user.createdAt, user.lastLogin, user.note]);
  logEvent('info', user.userId, 'createOrLoginUser', 'User created');
  return ok_(publicUser_(user));
}

function loginUser(userId, pin) {
  setupPublicMasterSheet();
  validatePin_(pin);
  const found = findUser_(userId);
  if (!found) return fail_('USER_NOT_FOUND', 'User-Code nicht gefunden.');
  if (found.user.pinHash !== hashPin_(pin)) return fail_('INVALID_PIN', 'PIN passt nicht.');
  if (found.user.status === 'disabled') {
    logEvent('warn', found.user.userId, 'loginUser', 'Disabled user blocked');
    return fail_('USER_DISABLED', 'Dieser Zugang ist deaktiviert.');
  }
  const now = isoNow_();
  found.sheet.getRange(found.rowIndex, 7).setValue(now);
  found.user.lastLogin = now;
  logEvent('info', found.user.userId, 'loginUser', 'Login ok');
  return ok_(publicUser_(found.user));
}

function checkAccess(userId, pin) {
  setupPublicMasterSheet();
  validatePin_(pin);
  const found = findUser_(userId);
  if (!found) return fail_('USER_NOT_FOUND', 'User-Code nicht gefunden.');
  if (found.user.pinHash !== hashPin_(pin)) return fail_('INVALID_PIN', 'PIN passt nicht.');
  if (found.user.status === 'disabled') {
    logEvent('warn', found.user.userId, 'checkAccess', 'Disabled user blocked');
    return fail_('USER_DISABLED', 'Dieser Zugang ist deaktiviert.');
  }
  return ok_(publicUser_(found.user));
}

function saveCloudData(userId, pin, dataKey, payloadJson) {
  const access = checkAccess(userId, pin);
  if (!access.ok) return access;
  if (!access.features || !access.features.cloudSync) return fail_('PLAN_NO_CLOUD_SYNC', 'Cloud-Sync ist fuer diesen Plan nicht aktiv.');
  const key = sanitizeDataKey_(dataKey);
  const payload = String(payloadJson || '');
  if (payload.length > 500000) return fail_('PAYLOAD_TOO_LARGE', 'Payload ist zu gross.');
  const sheet = getSheet_(SHEETS.CLOUD_DATA);
  const values = getRows_(sheet);
  const now = isoNow_();
  const idx = values.findIndex(function(row) {
    return String(row[0]) === String(userId) && String(row[1]) === key;
  });
  if (idx >= 0) {
    sheet.getRange(idx + 2, 3, 1, 2).setValues([[payload, now]]);
  } else {
    sheet.appendRow([userId, key, payload, now]);
  }
  logEvent('info', userId, 'saveCloudData', 'Cloud data saved: ' + key);
  return ok_({ userId: userId, dataKey: key, updatedAt: now });
}

function loadCloudData(userId, pin, dataKey) {
  const access = checkAccess(userId, pin);
  if (!access.ok) return access;
  if (!access.features || !access.features.cloudSync) return fail_('PLAN_NO_CLOUD_SYNC', 'Cloud-Sync ist fuer diesen Plan nicht aktiv.');
  const sheet = getSheet_(SHEETS.CLOUD_DATA);
  const values = getRows_(sheet).filter(function(row) {
    return String(row[0]) === String(userId);
  });
  if (!dataKey || dataKey === 'all') {
    return ok_({ userId: userId, data: values.map(cloudRow_) });
  }
  const key = sanitizeDataKey_(dataKey);
  const row = values.find(function(item) { return String(item[1]) === key; });
  return ok_({ userId: userId, dataKey: key, data: row ? cloudRow_(row) : null });
}

function setUserStatus(userId, status) {
  if (!['active', 'disabled'].includes(status)) throw new Error('Invalid status');
  const found = findUser_(userId);
  if (!found) throw new Error('User not found');
  found.sheet.getRange(found.rowIndex, 5).setValue(status);
  logEvent('info', userId, 'setUserStatus', 'Status changed to ' + status);
  return ok_({ userId: userId, status: status });
}

function setUserPlan(userId, plan) {
  if (!['free', 'friend', 'pro'].includes(plan)) throw new Error('Invalid plan');
  const found = findUser_(userId);
  if (!found) throw new Error('User not found');
  found.sheet.getRange(found.rowIndex, 4).setValue(plan);
  logEvent('info', userId, 'setUserPlan', 'Plan changed to ' + plan);
  return ok_({ userId: userId, plan: plan });
}

function testSaveCloudDataManual() {
  const userId = 'u_28e81f1c05'; // Bei Bedarf an vorhandenen Testuser anpassen.
  const pin = '1234'; // Nur manuell im Apps-Script-Editor ausfuehren.
  return saveCloudData(userId, pin, 'test', JSON.stringify({
    source: 'manual-test',
    ts: new Date().toISOString()
  }));
}

function testLoadCloudDataManual() {
  const userId = 'u_28e81f1c05'; // Bei Bedarf an vorhandenen Testuser anpassen.
  const pin = '1234'; // Nur manuell im Apps-Script-Editor ausfuehren.
  return loadCloudData(userId, pin, 'test');
}

function logEvent(level, userId, action, message) {
  const safeMessage = sanitizeText_(message, 300);
  getSheet_(SHEETS.LOGS).appendRow([
    isoNow_(),
    sanitizeText_(level || 'info', 20),
    sanitizeText_(userId || '', 80),
    sanitizeText_(action || '', 80),
    safeMessage
  ]);
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const action = String(body.action || '');
    const publicActions = {
      createOrLoginUser: function() { return createOrLoginUser(body.displayName, body.pin); },
      loginUser: function() { return loginUser(body.userId, body.pin); },
      checkAccess: function() { return checkAccess(body.userId, body.pin); },
      saveCloudData: function() { return saveCloudData(body.userId, body.pin, body.dataKey, body.payloadJson); },
      loadCloudData: function() { return loadCloudData(body.userId, body.pin, body.dataKey); }
    };
    if (!publicActions[action]) return json_(fail_('ACTION_NOT_ALLOWED', 'Action nicht erlaubt.'));
    return json_(publicActions[action]());
  } catch (err) {
    try { logEvent('error', '', 'doPost', err.message); } catch (_) {}
    return json_(fail_('SERVER_ERROR', err.message));
  }
}

function doGet(e) {
  return json_({ ok: true, service: 'PublicSync', version: PUBLIC_SYNC_VERSION });
}

function ensureHeader_(sheet, headers) {
  const range = sheet.getRange(1, 1, 1, headers.length);
  const current = range.getValues()[0];
  const next = current.map(function(cell, index) {
    return cell === '' ? headers[index] : cell;
  });
  const changed = next.some(function(cell, index) { return cell !== current[index]; });
  if (changed) range.setValues([next]);
}

function ensureAppConfig_(key, value) {
  const sheet = getSheet_(SHEETS.APP_CONFIG);
  const rows = getRows_(sheet);
  const exists = rows.some(function(row) { return String(row[0]) === key; });
  if (!exists) sheet.appendRow([key, value, isoNow_()]);
}

function getSheet_(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function getRows_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2, 1, last - 1, sheet.getLastColumn()).getValues();
}

function findUser_(userId) {
  const sheet = getSheet_(SHEETS.USERS);
  const rows = getRows_(sheet);
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]) === String(userId)) {
      return { sheet: sheet, rowIndex: i + 2, user: userFromRow_(rows[i]) };
    }
  }
  return null;
}

function userFromRow_(row) {
  return {
    userId: String(row[0] || ''),
    displayName: String(row[1] || ''),
    pinHash: String(row[2] || ''),
    plan: String(row[3] || 'free'),
    status: String(row[4] || 'active'),
    createdAt: String(row[5] || ''),
    lastLogin: String(row[6] || ''),
    note: String(row[7] || '')
  };
}

function publicUser_(user, featureOverride) {
  const features = featureOverride || {
    cloudSync: user.status !== 'disabled' && ['friend', 'pro'].includes(user.plan),
    proFeatures: user.status !== 'disabled' && ['friend', 'pro'].includes(user.plan)
  };
  return {
    userId: user.userId,
    displayName: user.displayName,
    plan: user.plan,
    status: user.status,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
    features: features
  };
}

function hashPin_(pin) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, PIN_HASH_PREFIX + String(pin));
  return bytes.map(function(b) {
    const v = (b < 0 ? b + 256 : b).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');
}

function validatePin_(pin) {
  if (!pin || String(pin).length < 4) throw new Error('PIN muss mindestens 4 Zeichen haben.');
}

function sanitizeText_(value, maxLen) {
  return String(value || '').replace(/[<>{}]/g, '').substring(0, maxLen || 100);
}

function sanitizeDataKey_(value) {
  const key = String(value || '').trim();
  if (!/^[a-zA-Z0-9_-]{1,40}$/.test(key)) throw new Error('Ungueltiger dataKey');
  return key;
}

function newUserId_() {
  return 'u_' + Utilities.getUuid().replace(/-/g, '').substring(0, 10);
}

function cloudRow_(row) {
  return {
    userId: String(row[0] || ''),
    dataKey: String(row[1] || ''),
    payloadJson: String(row[2] || ''),
    updatedAt: String(row[3] || '')
  };
}

function ok_(payload) {
  return Object.assign({ ok: true }, payload || {});
}

function fail_(code, message) {
  return { ok: false, code: code, error: message };
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function isoNow_() {
  return new Date().toISOString();
}
