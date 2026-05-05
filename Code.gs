const CONFIG = {
  DISCORD_WEBHOOK: 'https://discord.com/api/webhooks/1501267299422699521/MKan0SBG-vznscN4Jt1e8cxBdc3p8LT0uFuroNzll2ITBJgCQKpAHrfWyQ4j51SsPVlk',
  SPREADSHEET_ID: '1o84Ae3W9-mEWHje378Vb7P70nq6aw-jxJ1hyalh-f4Y',
  SHEET_NAME: 'Лист1',
  MAX_ACTIONS_PER_REQUEST: 30,
  MAX_ACTIONS_TOTAL: 100,
  CHUNK_SIZE: 10
};

const POINTS_SYSTEM = {
  'shooting_training_small': { name: '🔫 Тренировка по стрельбе (до 5 чел.)', points: 5, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'shooting_training_large': { name: '🔫 Тренировка по стрельбе (от 6 чел.)', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'black_market_defense': { name: '🏴 Участие в отбитии черного рынка', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'gs_defense': { name: '🎖️ Участие в отбитии ГШ', points: 8, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'racket_defense': { name: '💰 Отбитие рэкета/сдача денег с рэкета', points: 5, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'raid': { name: '⚔️ Рейд', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'butterfly_surrender': { name: '🦋 Сдача бабочки', points: 4, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'ft_fz_defense': { name: '🛡️ Отбитие ФТ/ФЗ', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'fishing_license_check': { name: '🎣 Проверка лицензий на рыбалку', points: 1, category: 'withEvidence', requiresQuantity: true, maxQuantity: 50, unit: 'раз' },
  'med_proc_check': { name: '🏥 Прохождение мед/прок проверки', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'fish_seizure': { name: '🐟 Изъятие рыбы', points: 1, category: 'withEvidence', requiresQuantity: true, maxQuantity: 100, unit: 'кг' },
  'mp_gmp_participation': { name: '🎭 Участие в МП/ГМП', points: 15, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'bank_robbery_cordon': { name: '🚧 Участие в оцеплении при ограблении', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'army_training': { name: '💪 Участие в тренировке армии', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'training': { name: '🏋️ Участие в тренировке', points: 5, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'trainee_training': { name: '👨‍🏫 Участие в обучении стажеров', points: 8, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'supply_ng_ems': { name: '📦 Поставка NG/EMS', points: 10, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'drop': { name: '💎 Дроп', points: 5, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'train_anal_defense': { name: '🚂 Участие в отбитии Поезда/Анала', points: 8, category: 'withEvidence', requiresQuantity: false, maxQuantity: 1 },
  'arrest': { name: '👮 Арест', points: 5, category: 'withEvidence', requiresQuantity: true, maxQuantity: 50, unit: 'раз' },
  'license_seizure': { name: '📜 Изъятие лицензий', points: 2, category: 'withEvidence', requiresQuantity: true, maxQuantity: 50, unit: 'шт' },
  'fine_issuance': { name: '💸 Штраф', points: 2, category: 'withEvidence', requiresQuantity: true, maxQuantity: 100, unit: 'раз' },
  'carjack_surrender': { name: '🚗 Сдача угонки', points: 6, category: 'withEvidence', requiresQuantity: true, maxQuantity: 10, unit: 'раз' },
  'car_registration': { name: '📝 Регистрация авто', points: 2, category: 'withEvidence', requiresQuantity: true, maxQuantity: 50, unit: 'раз' }
};

const RANKS = {
  'ml_officer': { name: 'Мл. офицер (3 ранг)', value: 'ml_officer' },
  'officer': { name: 'Офицер (4 ранг)', value: 'officer' },
  'st_officer': { name: 'Ст. Офицер (5 ранг)', value: 'st_officer' },
  'ml_sergeant': { name: 'Мл. Сержант (6 ранг)', value: 'ml_sergeant' },
  'sergeant': { name: 'Сержант (8 ранг)', value: 'sergeant' },
  'ml_lieutenant': { name: 'Мл. Лейтенант (9 ранг)', value: 'ml_lieutenant' },
  'lieutenant': { name: 'Лейтенант (10 ранг)', value: 'lieutenant' },
  'instructor': { name: 'Инструктор (11 ранг)', value: 'instructor' }
};

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('📊 Система отчетов Delta')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getPointsSystem() { return POINTS_SYSTEM; }
function getRanks() { return RANKS; }

function processForm(data) {
  try {
    if (!data.employee) throw new Error('Не указан игровой никнейм');
    if (!data.rank) throw new Error('Не указан ранг');
    if (!data.startDate || !data.endDate) throw new Error('Не указан период');
    if (!data.actions?.length) throw new Error('Нет действий');

    const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) throw new Error(`Лист ${CONFIG.SHEET_NAME} не найден`);

    const formatDate = (dateStr) => Utilities.formatDate(new Date(dateStr), 'GMT+3', 'dd.MM.yyyy');
    const start = formatDate(data.startDate);
    const end = formatDate(data.endDate);
    const period = `${start} - ${end} (${data.periodDays} дн.)`;
    const now = Utilities.formatDate(new Date(), 'GMT+3', 'dd.MM.yyyy HH:mm:ss');

    let totalPoints = 0;
    const savedRows = [];

    for (let i = 0; i < data.actions.length; i += CONFIG.CHUNK_SIZE) {
      const chunk = data.actions.slice(i, i + CONFIG.CHUNK_SIZE);
      const rows = [];

      chunk.forEach(a => {
        let pts = a.points || (a.basePoints * a.quantity);
        if (a.type === 'fish_seizure') pts = a.quantity;
        totalPoints += pts;

        let desc = a.name;
        if (a.quantity > 1 && a.unit) {
          desc = `${a.name} (×${a.quantity} ${a.unit})`;
        } else if (a.quantity > 1) {
          desc = `${a.name} (×${a.quantity})`;
        }
        
        let evidence = a.evidence?.trim() || '';
        if (a.category === 'withoutEvidence') evidence = '✅ Без доказательств';
        else if (!evidence) evidence = '⚠️ Доказательства не предоставлены';

        rows.push([now, data.employee, data.rankName, period, desc, pts, evidence]);
      });

      if (rows.length) {
        const lastRow = sheet.getLastRow() + 1;
        sheet.getRange(lastRow, 1, rows.length, 7).setValues(rows);
        rows.forEach((_, idx) => savedRows.push({ row: lastRow + idx, action: rows[idx][4], points: rows[idx][5] }));
      }
      Utilities.sleep(100);
    }

    let discordOk = false;
    if (!data.chunkIndex) {
      discordOk = sendToDiscord({
        employee: data.employee, rank: data.rankName, startDate: start, endDate: end,
        periodDays: data.periodDays, actions: data.actions, totalPoints, actionsCount: data.actions.length
      });
    }

    const msg = data.chunkIndex !== undefined
      ? `✅ Часть ${data.chunkIndex+1}/${data.totalChunks} отправлена`
      : `✅ Отчёт отправлен!\n• ${data.employee} (${data.rankName})\n• ${start} - ${end}\n• Действий: ${data.actions.length}, баллов: ${totalPoints}\n• Discord: ${discordOk ? '✅' : '⚠️'}`;

    return { success: true, message: msg };
  } catch (e) {
    return { success: false, message: `❌ Ошибка: ${e.message}` };
  }
}

function processFormChunk(data) { return processForm(data); }

function sendToDiscord(data) {
  try {
    const MAX_ACTIONS_PER_EMBED = 5;
    const embeds = [];

    embeds.push({
      title: '📊 Еженедельный отчет SWAT',
      color: 16777215,
      description: `**${data.employee}** (${data.rank})`,
      fields: [
        { name: '📅 Период', value: `\`${data.startDate} - ${data.endDate} (${data.periodDays} дн.)\``, inline: true },
        { name: '🏆 Баллы', value: `\`${data.totalPoints}\``, inline: true },
        { name: '📊 Действий', value: `\`${data.actionsCount}\``, inline: true }
      ],
      timestamp: new Date().toISOString()
    });

    const withEvidence = data.actions.filter(a => a.category === 'withEvidence' && a.evidence?.trim());
    for (let i = 0; i < withEvidence.length; i += MAX_ACTIONS_PER_EMBED) {
      const chunk = withEvidence.slice(i, i + MAX_ACTIONS_PER_EMBED);
      let desc = '';
      chunk.forEach((a, idx) => {
        let pts = a.points || a.basePoints * a.quantity;
        if (a.type === 'fish_seizure') pts = a.quantity;
        let actionText = a.name;
        if (a.quantity > 1 && a.unit) {
          actionText = `${a.name} ×${a.quantity} ${a.unit}`;
        } else if (a.quantity > 1) {
          actionText = `${a.name} ×${a.quantity}`;
        }
        desc += `**${i+idx+1}. ${actionText}** → ${pts} баллов\n`;
        const links = a.evidence.split('\n').filter(l => l.trim()).slice(0, 3);
        if (links.length) desc += `📎 ${links.join(', ')}\n`;
        if (idx < chunk.length-1) desc += '━━━━━━━━\n';
      });
      embeds.push({ title: `📁 Доказательства (часть ${i/MAX_ACTIONS_PER_EMBED+1})`, color: 16777215, description: desc.slice(0, 4096) });
    }

    const withoutEvidence = data.actions.filter(a => a.category === 'withoutEvidence' || (a.category === 'withEvidence' && !a.evidence?.trim()));
    for (let i = 0; i < withoutEvidence.length; i += MAX_ACTIONS_PER_EMBED) {
      const chunk = withoutEvidence.slice(i, i + MAX_ACTIONS_PER_EMBED);
      let desc = '';
      chunk.forEach((a, idx) => {
        let pts = a.points || a.basePoints * a.quantity;
        if (a.type === 'fish_seizure') pts = a.quantity;
        let actionText = a.name;
        if (a.quantity > 1 && a.unit) {
          actionText = `${a.name} ×${a.quantity} ${a.unit}`;
        } else if (a.quantity > 1) {
          actionText = `${a.name} ×${a.quantity}`;
        }
        desc += `**${i+idx+1}. ${actionText}** → ${pts} баллов\n`;
        if (a.category === 'withoutEvidence') desc += '✅ без док-в\n';
        else desc += '⚠️ док-ва не приложены\n';
        if (idx < chunk.length-1) desc += '━━━━━━━━\n';
      });
      embeds.push({ title: `⚡ Без доказательств (часть ${i/MAX_ACTIONS_PER_EMBED+1})`, color: 16777215, description: desc.slice(0, 4096) });
    }

    const payload = {
      username: 'Отчет SWAT',
      avatar_url: 'https://i.ytimg.com/vi/-73syMbr0oA/maxresdefault.jpg',
      content: '<@&718381675972657193> <@&718381766901104670> <@&727914806233006140>',
      embeds: embeds.slice(0, 10)
    };

    const response = UrlFetchApp.fetch(CONFIG.DISCORD_WEBHOOK, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      timeout: 15000
    });
    return response.getResponseCode() === 204;
  } catch (e) {
    console.error('Discord error:', e);
    return false;
  }
}

function testSystem() {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7*86400000);
  const fmt = d => d.toISOString().split('T')[0];
  return processForm({
    employee: 'Test User',
    rank: 'ml_lieutenant',
    rankName: 'Мл. Лейтенант',
    startDate: fmt(weekAgo),
    endDate: fmt(today),
    periodDays: 7,
    actions: [
      { type: 'shooting_training_small', name: '🔫 Тренировка (до 5)', quantity: 1, basePoints: 5, points: 5, evidence: 'https://discord.com/...', category: 'withEvidence', unit: null },
      { type: 'arrest', name: '👮 Арест', quantity: 3, basePoints: 5, points: 15, evidence: '', category: 'withoutEvidence', unit: 'раз' }
    ]
  });
}
