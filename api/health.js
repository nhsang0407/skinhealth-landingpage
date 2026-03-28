module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'Method Not Allowed' });
  }

  return res.status(200).json({ status: 'OK' });
};
