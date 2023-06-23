const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/login`,
    signUp: `${API}/auth/signup`,
    profile: `${API}/auth/user`,
  },
  platforms: {
    api: `${API}/admin/platforms`,
    profiles: `${API}/admin/profiles`,
    alias: `${API}/admin/profiles/alias`,
  },
  orders: {
    api: `${API}/admin/orders`,
  },
  users: {
    api: `${API}/admin/users`,
  },
  mailer: {
    api: `${API}/admin/email/send`,
  },
};

module.exports = endPoints;
