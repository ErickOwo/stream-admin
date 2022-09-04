const API = process.env.NEXT_PUBLIC_API_URL;

const endPoinst = {
  auth: {
    login: `${API}/login`,
    signUp: `${API}/auth/signup`,
    profile: `${API}/auth/user`,
  },
  platforms: {
    api: `${API}/admin/platforms`,
  },
  mailer: {
    api: `${API}/admin/email/send`,
  },
};

module.exports = endPoinst;
