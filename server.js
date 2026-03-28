const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SHEETS_SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || 'UserInfo';
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  ? process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
  : '';

function hasGoogleSheetsConfig() {
  return Boolean(
    GOOGLE_SHEETS_SPREADSHEET_ID &&
      GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
}

function getGoogleSheetsErrorMessage(error) {
  const reason = error?.errors?.[0]?.reason || error?.response?.data?.error?.errors?.[0]?.reason;

  if (reason === 'accessNotConfigured') {
    return 'Google Sheets API chưa được bật cho project service account.';
  }

  if (reason === 'forbidden' || reason === 'insufficientPermissions') {
    return 'Service account chưa có quyền ghi vào Google Sheet. Hãy share file cho email service account với quyền Editor.';
  }

  if (reason === 'notFound') {
    return 'Không tìm thấy Google Sheet hoặc tab UserInfo. Kiểm tra GOOGLE_SHEETS_SPREADSHEET_ID và GOOGLE_SHEETS_SHEET_NAME.';
  }

  return 'Không thể lưu dữ liệu vào Google Sheet';
}

async function appendUserInfoToSheet({ name, email, businessType }) {
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${GOOGLE_SHEETS_SHEET_NAME}!A:C`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[name, email, businessType]]
    }
  });
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'SkinHealth Backend API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.post('/api/subscribe', async (req, res) => {
  const { name, email, business_type: businessTypeRaw } = req.body;
  const safeName = typeof name === 'string' ? name.trim() : '';
  const safeEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const safeBusinessType = typeof businessTypeRaw === 'string' ? businessTypeRaw.trim() : '';

  if (!safeName || !safeEmail) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu thông tin bắt buộc: name, email'
    });
  }

  if (!EMAIL_PATTERN.test(safeEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Email không hợp lệ'
    });
  }

  if (!hasGoogleSheetsConfig()) {
    return res.status(500).json({
      success: false,
      message: 'Google Sheets chưa được cấu hình trên server'
    });
  }

  try {
    await appendUserInfoToSheet({
      name: safeName,
      email: safeEmail,
      businessType: safeBusinessType
    });

    console.log('Newsletter subscription saved to sheet:', {
      name: safeName,
      email: safeEmail,
      businessType: safeBusinessType
    });

    return res.json({
      success: true,
      message: 'Đăng ký nhận tin thành công! Cảm ơn bạn đã quan tâm.'
    });
  } catch (error) {
    console.error('Failed to append row to Google Sheets:', error);
    return res.status(500).json({
      success: false,
      message: getGoogleSheetsErrorMessage(error)
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Backend API ready for SkinHealth Landing Page');
});